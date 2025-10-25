// Insertion Sort Algorithm - Modular Implementation
class InsertionSort {
    constructor(visualizer) {
        this.visualizer = visualizer;
    }

    async sort() {
        this.visualizer.updateStatus('Insertion Sort: Starting...');
        const n = this.visualizer.array.length;
        
        for (let i = 1; i < n; i++) {
            if (this.visualizer.isPaused) break;
            
            let key = this.visualizer.array[i];
            let j = i - 1;
            
            // Highlight the element being inserted
            const insertHighlights = {};
            insertHighlights[i] = {
                color: '#ed8936',
                label: 'INSERTING',
                border: true,
                borderColor: '#ffffff'
            };
            
            // Mark already sorted elements
            for (let k = 0; k < i; k++) {
                insertHighlights[k] = {
                    color: '#38a169',
                    label: 'SORTED'
                };
            }
            
            this.visualizer.drawArray(insertHighlights);
            await this.visualizer.sleep();
            
            // Move elements greater than key one position ahead
            while (j >= 0 && this.visualizer.array[j] > key) {
                if (this.visualizer.isPaused) break;
                
                this.visualizer.comparisons++;
                this.visualizer.updateMetricsDisplay();
                
                // Create highlights for comparison
                const compareHighlights = {};
                compareHighlights[j] = {
                    color: '#ed8936',
                    label: 'COMPARING',
                    border: true,
                    borderColor: '#ffffff'
                };
                compareHighlights[j + 1] = {
                    color: '#f56565',
                    label: 'SHIFTING',
                    border: true,
                    borderColor: '#ffffff'
                };
                
                // Mark already sorted elements
                for (let k = 0; k < i; k++) {
                    if (k !== j + 1) {
                        compareHighlights[k] = {
                            color: '#38a169',
                            label: 'SORTED'
                        };
                    }
                }
                
                this.visualizer.drawArray(compareHighlights);
                await this.visualizer.sleep();
                
                this.visualizer.array[j + 1] = this.visualizer.array[j];
                this.visualizer.swaps++;
                this.visualizer.updateMetricsDisplay();
                
                // Highlight shifted bar
                const shiftHighlights = {};
                shiftHighlights[j + 1] = {
                    color: '#f56565',
                    label: 'SHIFTED',
                    border: true,
                    borderColor: '#ffffff'
                };
                
                // Mark already sorted elements
                for (let k = 0; k < i; k++) {
                    shiftHighlights[k] = {
                        color: '#38a169',
                        label: 'SORTED'
                    };
                }
                
                this.visualizer.drawArray(shiftHighlights);
                await this.visualizer.sleep();
                
                j--;
            }
            
            this.visualizer.array[j + 1] = key;
            
            // Mark elements as sorted up to current position
            const sortedHighlights = {};
            for (let k = 0; k <= i; k++) {
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
