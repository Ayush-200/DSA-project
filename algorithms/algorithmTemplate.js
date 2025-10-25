// Template for Adding New Sorting Algorithms
// Copy this file and modify it to implement your own sorting algorithm

class NewSortAlgorithm {
    constructor(visualizer) {
        this.visualizer = visualizer;
    }

    async sort() {
        this.visualizer.updateStatus('New Algorithm: Starting...');
        
        // Your algorithm implementation goes here
        // Access the array with: this.visualizer.array
        // Draw visualization with: this.visualizer.drawArray(highlights)
        // Add animation delay with: await this.visualizer.sleep()
        // Update metrics with: this.visualizer.comparisons++ and this.visualizer.swaps++
        
        // Example implementation structure:
        const n = this.visualizer.array.length;
        
        for (let i = 0; i < n; i++) {
            if (this.visualizer.isPaused) break;
            
            // Create highlights object for visualization
            const highlights = {};
            highlights[i] = {
                color: '#48bb78',        // Color of the bar
                label: 'CURRENT',        // Label above the bar
                border: true,           // Whether to show white border
                borderColor: '#ffffff'   // Border color
            };
            
            // Draw the visualization
            this.visualizer.drawArray(highlights);
            
            // Update metrics
            this.visualizer.comparisons++;
            this.visualizer.updateMetricsDisplay();
            
            // Add animation delay
            await this.visualizer.sleep();
        }
        
        // Mark all bars as sorted when done
        if (!this.visualizer.isPaused) {
            this.visualizer.markAllBarsAsSorted();
        }
    }
}

// Available colors for visualization:
// '#667eea' - Default blue
// '#48bb78' - Green (current iterator)
// '#ed8936' - Orange (comparing)
// '#f56565' - Red (swapping/moving)
// '#9f7aea' - Purple (pivot)
// '#38a169' - Dark green (sorted)
// '#3182ce' - Light blue (position/boundary)

// Common labels:
// 'CURRENT', 'COMPARING', 'SWAPPED', 'SORTED', 'PIVOT', 'MIN', 'MAX', 'BOUNDARY', etc.
