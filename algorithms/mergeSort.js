// Merge Sort Algorithm - Modular Implementation
class MergeSort {
    constructor(visualizer) {
        this.visualizer = visualizer;
    }

    async sort() {
        this.visualizer.updateStatus('Merge Sort: Starting...');
        await this.mergeSortHelper(0, this.visualizer.array.length - 1);
        
        if (!this.visualizer.isPaused) {
            this.visualizer.markAllBarsAsSorted();
        }
    }

    async mergeSortHelper(left, right) {
        if (left < right && !this.visualizer.isPaused) {
            const mid = Math.floor((left + right) / 2);
            
            await this.mergeSortHelper(left, mid);
            await this.mergeSortHelper(mid + 1, right);
            await this.merge(left, mid, right);
        }
    }

    async merge(left, mid, right) {
        const leftArray = this.visualizer.array.slice(left, mid + 1);
        const rightArray = this.visualizer.array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArray.length && j < rightArray.length && !this.visualizer.isPaused) {
            this.visualizer.comparisons++;
            this.visualizer.updateMetricsDisplay();
            
            // Create highlights for merge comparison
            const mergeHighlights = {};
            mergeHighlights[left + i] = {
                color: '#ed8936',
                label: 'LEFT',
                border: true,
                borderColor: '#ffffff'
            };
            mergeHighlights[mid + 1 + j] = {
                color: '#ed8936',
                label: 'RIGHT',
                border: true,
                borderColor: '#ffffff'
            };
            
            this.visualizer.drawArray(mergeHighlights);
            await this.visualizer.sleep();
            
            if (leftArray[i] <= rightArray[j]) {
                this.visualizer.array[k] = leftArray[i];
                i++;
            } else {
                this.visualizer.array[k] = rightArray[j];
                j++;
            }
            
            this.visualizer.swaps++;
            this.visualizer.updateMetricsDisplay();
            
            // Highlight merged bar
            const mergedHighlights = {};
            mergedHighlights[k] = {
                color: '#f56565',
                label: 'MERGED',
                border: true,
                borderColor: '#ffffff'
            };
            
            this.visualizer.drawArray(mergedHighlights);
            await this.visualizer.sleep();
            
            k++;
        }
        
        // Copy remaining elements
        while (i < leftArray.length && !this.visualizer.isPaused) {
            this.visualizer.array[k] = leftArray[i];
            const remainingHighlights = {};
            remainingHighlights[k] = {
                color: '#f56565',
                label: 'MERGED',
                border: true,
                borderColor: '#ffffff'
            };
            this.visualizer.drawArray(remainingHighlights);
            await this.visualizer.sleep();
            i++;
            k++;
        }
        
        while (j < rightArray.length && !this.visualizer.isPaused) {
            this.visualizer.array[k] = rightArray[j];
            const remainingHighlights = {};
            remainingHighlights[k] = {
                color: '#f56565',
                label: 'MERGED',
                border: true,
                borderColor: '#ffffff'
            };
            this.visualizer.drawArray(remainingHighlights);
            await this.visualizer.sleep();
            j++;
            k++;
        }
    }
}
