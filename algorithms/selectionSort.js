// Selection Sort Algorithm - Modular Implementation
class SelectionSort {
    constructor(visualizer) {
        this.visualizer = visualizer;
    }

    async sort() {
        this.visualizer.updateStatus('Selection Sort: Starting...');
        const n = this.visualizer.array.length;
        
        for (let i = 0; i < n - 1; i++) {
            if (this.visualizer.isPaused) break;
            
            let minIndex = i;
            
            // Find minimum element in remaining array
            for (let j = i + 1; j < n; j++) {
                if (this.visualizer.isPaused) break;
                
                // Create highlights object
                const highlights = {};
                
                // Mark current position (i) in blue
                highlights[i] = {
                    color: '#3182ce',
                    label: 'POSITION',
                    border: true,
                    borderColor: '#ffffff'
                };
                
                // Mark current minimum in green
                highlights[minIndex] = {
                    color: '#48bb78',
                    label: 'MIN',
                    border: true,
                    borderColor: '#ffffff'
                };
                
                // Mark element being compared in orange
                highlights[j] = {
                    color: '#ed8936',
                    label: 'CHECKING',
                    border: true,
                    borderColor: '#ffffff'
                };
                
                // Mark already sorted elements
                for (let k = 0; k < i; k++) {
                    highlights[k] = {
                        color: '#38a169',
                        label: 'SORTED'
                    };
                }
                
                this.visualizer.drawArray(highlights);
                this.visualizer.comparisons++;
                this.visualizer.updateMetricsDisplay();
                await this.visualizer.sleep();
                
                if (this.visualizer.array[j] < this.visualizer.array[minIndex]) {
                    minIndex = j;
                }
            }
            
            // Swap if minimum is not at current position
            if (minIndex !== i) {
                [this.visualizer.array[i], this.visualizer.array[minIndex]] = [this.visualizer.array[minIndex], this.visualizer.array[i]];
                this.visualizer.swaps++;
                this.visualizer.updateMetricsDisplay();
                
                // Highlight swapped bars in red
                const swapHighlights = {};
                swapHighlights[i] = {
                    color: '#f56565',
                    label: 'SWAPPED',
                    border: true,
                    borderColor: '#ffffff'
                };
                swapHighlights[minIndex] = {
                    color: '#f56565',
                    label: 'SWAPPED',
                    border: true,
                    borderColor: '#ffffff'
                };
                
                // Mark already sorted elements
                for (let k = 0; k < i; k++) {
                    swapHighlights[k] = {
                        color: '#38a169',
                        label: 'SORTED'
                    };
                }
                
                this.visualizer.drawArray(swapHighlights);
                await this.visualizer.sleep();
            }
            
            // Mark current position as sorted
            const sortedHighlights = {};
            sortedHighlights[i] = {
                color: '#38a169',
                label: 'SORTED',
                border: true,
                borderColor: '#ffffff'
            };
            
            // Mark already sorted elements
            for (let k = 0; k < i; k++) {
                sortedHighlights[k] = {
                    color: '#38a169',
                    label: 'SORTED'
                };
            }
            
            this.visualizer.drawArray(sortedHighlights);
            await this.visualizer.sleep();
        }
        
        if (!this.visualizer.isPaused) {
            this.visualizer.markAllBarsAsSorted();
        }
    }
}
