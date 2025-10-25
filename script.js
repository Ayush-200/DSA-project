// Sorting Algorithm Visualizer - Main JavaScript File

class SortingVisualizer {
    constructor() {
        this.array = [];
        this.originalArray = [];
        this.isSorting = false;
        this.isPaused = false;
        this.currentAlgorithm = null;
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = 0;
        this.speed = 'medium';
        
        // Canvas setup
        this.canvas = document.getElementById('sorting-chart');
        this.ctx = this.canvas.getContext('2d');
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        
        // Initialize sorting algorithms
        this.algorithms = {
            bubble: new BubbleSort(this),
            selection: new SelectionSort(this),
            insertion: new InsertionSort(this),
            merge: new MergeSort(this),
            quick: new QuickSort(this)
        };
        
        this.initializeEventListeners();
        this.generateRandomArray();
        this.drawArray();
    }

    initializeEventListeners() {
        // Array size control
        const arraySizeSlider = document.getElementById('array-size');
        const sizeDisplay = document.getElementById('size-display');
        
        arraySizeSlider.addEventListener('input', (e) => {
            const size = parseInt(e.target.value);
            sizeDisplay.textContent = size;
            this.generateRandomArray(size);
            this.drawArray();
        });

        // Generate random array button
        document.getElementById('generate-random').addEventListener('click', () => {
            const size = parseInt(arraySizeSlider.value);
            this.generateRandomArray(size);
            this.drawArray();
            this.updateStatus('Random array generated!');
        });

        // Custom input toggle
        document.getElementById('generate-custom').addEventListener('click', () => {
            const customRow = document.getElementById('custom-input-row');
            customRow.style.display = customRow.style.display === 'none' ? 'flex' : 'none';
        });

        // Apply custom array
        document.getElementById('apply-custom').addEventListener('click', () => {
            this.applyCustomArray();
        });

        // Algorithm selection
        document.querySelectorAll('.algorithm-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectAlgorithm(e.target.dataset.algorithm);
            });
        });

        // Playback controls
        document.getElementById('start-sort').addEventListener('click', () => {
            this.startSorting();
        });

        document.getElementById('pause-sort').addEventListener('click', () => {
            this.pauseSorting();
        });

        document.getElementById('reset-sort').addEventListener('click', () => {
            this.resetSorting();
        });

        // Speed control
        document.getElementById('speed-select').addEventListener('change', (e) => {
            this.speed = e.target.value;
        });
    }

    generateRandomArray(size = 20) {
        this.array = [];
        for (let i = 0; i < size; i++) {
            this.array.push(Math.floor(Math.random() * 100) + 1);
        }
        this.originalArray = [...this.array];
        this.resetMetrics();
    }

    applyCustomArray() {
        const customInput = document.getElementById('custom-array').value.trim();
        if (!customInput) {
            this.updateStatus('Please enter numbers separated by commas!');
            return;
        }

        try {
            const numbers = customInput.split(',').map(num => {
                const parsed = parseInt(num.trim());
                if (isNaN(parsed) || parsed < 1 || parsed > 100) {
                    throw new Error('Invalid number');
                }
                return parsed;
            });

            if (numbers.length < 5 || numbers.length > 100) {
                throw new Error('Array size must be between 5 and 100');
            }

            this.array = numbers;
            this.originalArray = [...this.array];
            this.resetMetrics();
            this.drawArray();
            this.updateStatus('Custom array applied successfully!');
            
            // Update size slider
            document.getElementById('array-size').value = numbers.length;
            document.getElementById('size-display').textContent = numbers.length;
            
        } catch (error) {
            this.updateStatus('Invalid input! Please enter numbers between 1-100, separated by commas.');
        }
    }

    selectAlgorithm(algorithm) {
        if (this.isSorting) {
            this.updateStatus('Cannot change algorithm while sorting!');
            return;
        }

        // Remove active class from all buttons
        document.querySelectorAll('.algorithm-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to selected button
        document.querySelector(`[data-algorithm="${algorithm}"]`).classList.add('active');
        
        this.currentAlgorithm = algorithm;
        document.getElementById('current-algorithm').textContent = 
            algorithm.charAt(0).toUpperCase() + algorithm.slice(1) + ' Sort';
        
        this.updateStatus(`${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort selected!`);
    }

    async startSorting() {
        if (!this.currentAlgorithm) {
            this.updateStatus('Please select an algorithm first!');
            return;
        }

        if (this.isSorting) {
            this.updateStatus('Already sorting!');
            return;
        }

        this.isSorting = true;
        this.isPaused = false;
        this.startTime = performance.now();
        this.resetMetrics();

        // Update button states
        document.getElementById('start-sort').disabled = true;
        document.getElementById('pause-sort').disabled = false;

        this.updateStatus(`Starting ${this.currentAlgorithm} sort...`);

        try {
            // Use the modular algorithm
            await this.algorithms[this.currentAlgorithm].sort();
            
            if (!this.isPaused) {
                this.updateStatus('Sorting completed!');
                this.markArrayAsSorted();
            }
        } catch (error) {
            this.updateStatus('Sorting interrupted!');
        } finally {
            this.isSorting = false;
            document.getElementById('start-sort').disabled = false;
            document.getElementById('pause-sort').disabled = true;
        }
    }

    pauseSorting() {
        if (!this.isSorting) return;
        
        this.isPaused = true;
        this.isSorting = false;
        document.getElementById('start-sort').disabled = false;
        document.getElementById('pause-sort').disabled = true;
        this.updateStatus('Sorting paused!');
    }

    resetSorting() {
        this.isSorting = false;
        this.isPaused = false;
        this.array = [...this.originalArray];
        this.resetMetrics();
        this.drawArray();
        
        // Reset button states
        document.getElementById('start-sort').disabled = false;
        document.getElementById('pause-sort').disabled = true;
        
        this.updateStatus('Array reset to original state!');
    }

    resetMetrics() {
        this.comparisons = 0;
        this.swaps = 0;
        this.updateMetricsDisplay();
    }

    updateMetricsDisplay() {
        document.getElementById('comparisons-count').textContent = this.comparisons;
        document.getElementById('swaps-count').textContent = this.swaps;
        
        if (this.startTime > 0) {
            const elapsed = Math.round(performance.now() - this.startTime);
            document.getElementById('execution-time').textContent = `${elapsed}ms`;
        }
    }

    updateStatus(message) {
        document.getElementById('status-message').textContent = message;
    }

    getSpeedDelay() {
        switch (this.speed) {
            case 'slow': return 1000;
            case 'medium': return 300;
            case 'fast': return 100;
            default: return 300;
        }
    }

    async sleep() {
        return new Promise(resolve => setTimeout(resolve, this.getSpeedDelay()));
    }

    // Enhanced drawing functions with better visual feedback
    drawArray(highlights = {}) {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        
        if (this.array.length === 0) return;

        const barWidth = this.canvasWidth / this.array.length;
        const maxValue = Math.max(...this.array);
        
        this.array.forEach((value, index) => {
            const barHeight = (value / maxValue) * (this.canvasHeight - 60); // More space for labels
            const x = index * barWidth;
            const y = this.canvasHeight - barHeight - 40;
            
            // Determine color and styling based on highlights
            let color = '#667eea'; // Default blue
            let label = '';
            let hasBorder = false;
            let borderColor = '#ffffff';
            
            if (highlights[index]) {
                const highlight = highlights[index];
                color = highlight.color;
                label = highlight.label || '';
                hasBorder = highlight.border || false;
                borderColor = highlight.borderColor || '#ffffff';
            }
            
            // Draw the bar
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
            
            // Add border for highlighted elements
            if (hasBorder) {
                this.ctx.strokeStyle = borderColor;
                this.ctx.lineWidth = 3;
                this.ctx.strokeRect(x + 2, y, barWidth - 4, barHeight);
            }
            
            // Draw label above the bar
            if (label) {
                this.ctx.fillStyle = color;
                this.ctx.font = 'bold 10px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(label, x + barWidth/2, y - 8);
            }
            
            // Draw value text
            this.ctx.fillStyle = '#333';
            this.ctx.font = 'bold 12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(value.toString(), x + barWidth/2, this.canvasHeight - 5);
        });
    }

    getBarColor(index) {
        // Default color scheme
        return '#667eea';
    }

    markArrayAsSorted() {
        // Mark all bars as sorted (green)
        this.array.forEach((_, index) => {
            this.ctx.fillStyle = '#48bb78';
            const barWidth = this.canvasWidth / this.array.length;
            const maxValue = Math.max(...this.array);
            const barHeight = (this.array[index] / maxValue) * (this.canvasHeight - 40);
            const x = index * barWidth;
            const y = this.canvasHeight - barHeight - 20;
            this.ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
        });
    }


    markAllBarsAsSorted() {
        const sortedHighlights = {};
        this.array.forEach((_, index) => {
            sortedHighlights[index] = {
                color: '#38a169',
                label: 'SORTED',
                border: true,
                borderColor: '#ffffff'
            };
        });
        this.drawArray(sortedHighlights);
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SortingVisualizer();
});
