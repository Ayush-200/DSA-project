// Bubble Sort Algorithm - Modular Implementation
class BubbleSort {
    constructor(visualizer) {
        this.visualizer = visualizer;
    }

    async sort() {
        this.visualizer.updateStatus('Bubble Sort: Starting...');
        const n = this.visualizer.array.length;
        
        for (let i = 0; i < n - 1; i++) {
            if (this.visualizer.isPaused) break;
            
            for (let j = 0; j < n - i - 1; j++) {
                if (this.visualizer.isPaused) break;
                
                // Create highlights object
                const highlights = {};
                
                // Mark current iterator (j) in green
                highlights[j] = {
                    color: '#48bb78',
                    label: 'CURRENT',
                    border: true,
                    borderColor: '#ffffff'
                };
                
                // Mark element being compared (j+1) in orange
                highlights[j + 1] = {
                    color: '#ed8936',
                    label: 'COMPARING',
                    border: true,
                    borderColor: '#ffffff'
                };
                
                // Mark already sorted elements
                for (let k = n - i; k < n; k++) {
                    highlights[k] = {
                        color: '#38a169',
                        label: 'SORTED'
                    };
                }
                
                this.visualizer.drawArray(highlights);
                this.visualizer.comparisons++;
                this.visualizer.updateMetricsDisplay();
                await this.visualizer.sleep();
                
                if (this.visualizer.array[j] > this.visualizer.array[j + 1]) {
                    // Swap elements
                    [this.visualizer.array[j], this.visualizer.array[j + 1]] = [this.visualizer.array[j + 1], this.visualizer.array[j]];
                    this.visualizer.swaps++;
                    this.visualizer.updateMetricsDisplay();
                    
                    // Highlight swapped bars in red
                    const swapHighlights = {};
                    swapHighlights[j] = {
                        color: '#f56565',
                        label: 'SWAPPED',
                        border: true,
                        borderColor: '#ffffff'
                    };
                    swapHighlights[j + 1] = {
                        color: '#f56565',
                        label: 'SWAPPED',
                        border: true,
                        borderColor: '#ffffff'
                    };
                    
                    // Mark already sorted elements
                    for (let k = n - i; k < n; k++) {
                        swapHighlights[k] = {
                            color: '#38a169',
                            label: 'SORTED'
                        };
                    }
                    
                    this.visualizer.drawArray(swapHighlights);
                    await this.visualizer.sleep();
                }
            }
        }
        
        if (!this.visualizer.isPaused) {
            this.visualizer.markAllBarsAsSorted();
        }
    }
}
