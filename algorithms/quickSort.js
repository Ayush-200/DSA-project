// Quick Sort Algorithm - Modular Implementation
class QuickSort {
    constructor(visualizer) {
        this.visualizer = visualizer;
    }

    async sort() {
        this.visualizer.updateStatus('Quick Sort: Starting...');
        await this.quickSortHelper(0, this.visualizer.array.length - 1);
        
        if (!this.visualizer.isPaused) {
            this.visualizer.markAllBarsAsSorted();
        }
    }

    async quickSortHelper(low, high) {
        if (low < high && !this.visualizer.isPaused) {
            const pivotIndex = await this.partition(low, high);
            await this.quickSortHelper(low, pivotIndex - 1);
            await this.quickSortHelper(pivotIndex + 1, high);
        }
    }

    async partition(low, high) {
        const pivot = this.visualizer.array[high];
        let i = low - 1;
        
        // Highlight pivot
        const pivotHighlights = {};
        pivotHighlights[high] = {
            color: '#9f7aea',
            label: 'PIVOT',
            border: true,
            borderColor: '#ffffff'
        };
        
        this.visualizer.drawArray(pivotHighlights);
        await this.visualizer.sleep();
        
        for (let j = low; j < high; j++) {
            if (this.visualizer.isPaused) break;
            
            this.visualizer.comparisons++;
            this.visualizer.updateMetricsDisplay();
            
            // Create highlights for comparison
            const compareHighlights = {};
            compareHighlights[high] = {
                color: '#9f7aea',
                label: 'PIVOT',
                border: true,
                borderColor: '#ffffff'
            };
            compareHighlights[j] = {
                color: '#ed8936',
                label: 'COMPARING',
                border: true,
                borderColor: '#ffffff'
            };
            
            // Mark partition boundary
            if (i >= low) {
                compareHighlights[i] = {
                    color: '#3182ce',
                    label: 'BOUNDARY',
                    border: true,
                    borderColor: '#ffffff'
                };
            }
            
            this.visualizer.drawArray(compareHighlights);
            await this.visualizer.sleep();
            
            if (this.visualizer.array[j] < pivot) {
                i++;
                if (i !== j) {
                    [this.visualizer.array[i], this.visualizer.array[j]] = [this.visualizer.array[j], this.visualizer.array[i]];
                    this.visualizer.swaps++;
                    this.visualizer.updateMetricsDisplay();
                    
                    // Highlight swapped elements
                    const swapHighlights = {};
                    swapHighlights[high] = {
                        color: '#9f7aea',
                        label: 'PIVOT',
                        border: true,
                        borderColor: '#ffffff'
                    };
                    swapHighlights[i] = {
                        color: '#f56565',
                        label: 'SWAPPED',
                        border: true,
                        borderColor: '#ffffff'
                    };
                    swapHighlights[j] = {
                        color: '#f56565',
                        label: 'SWAPPED',
                        border: true,
                        borderColor: '#ffffff'
                    };
                    
                    this.visualizer.drawArray(swapHighlights);
                    await this.visualizer.sleep();
                } else {
                    // Just highlight the element that will be swapped
                    const boundaryHighlights = {};
                    boundaryHighlights[high] = {
                        color: '#9f7aea',
                        label: 'PIVOT',
                        border: true,
                        borderColor: '#ffffff'
                    };
                    boundaryHighlights[i] = {
                        color: '#3182ce',
                        label: 'BOUNDARY',
                        border: true,
                        borderColor: '#ffffff'
                    };
                    
                    this.visualizer.drawArray(boundaryHighlights);
                    await this.visualizer.sleep();
                }
            }
        }
        
        // Place pivot in correct position
        [this.visualizer.array[i + 1], this.visualizer.array[high]] = [this.visualizer.array[high], this.visualizer.array[i + 1]];
        this.visualizer.swaps++;
        this.visualizer.updateMetricsDisplay();
        
        // Highlight final pivot position
        const finalHighlights = {};
        finalHighlights[i + 1] = {
            color: '#48bb78',
            label: 'SORTED',
            border: true,
            borderColor: '#ffffff'
        };
        finalHighlights[high] = {
            color: '#f56565',
            label: 'SWAPPED',
            border: true,
            borderColor: '#ffffff'
        };
        
        this.visualizer.drawArray(finalHighlights);
        await this.visualizer.sleep();
        
        return i + 1;
    }
}
