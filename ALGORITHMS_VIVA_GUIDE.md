# Sorting Algorithms Code Analysis & Viva Guide

## 📚 Overview
This document provides a detailed analysis of each sorting algorithm's implementation in our visualizer, explaining both the theoretical concepts and practical code implementation for viva preparation.

---

## 🔵 Bubble Sort (`algorithms/bubbleSort.js`)

### **Algorithm Theory**
- **Time Complexity**: O(n²) - Worst case
- **Space Complexity**: O(1) - In-place sorting
- **Stability**: Stable
- **Approach**: Compare adjacent elements and swap if they are in wrong order

### **Code Implementation Analysis**

```javascript
class BubbleSort {
    constructor(visualizer) {
        this.visualizer = visualizer;  // Reference to main visualizer
    }

    async sort() {
        const n = this.visualizer.array.length;
        
        // Outer loop: Number of passes (n-1 passes needed)
        for (let i = 0; i < n - 1; i++) {
            if (this.visualizer.isPaused) break;
            
            // Inner loop: Compare adjacent elements
            for (let j = 0; j < n - i - 1; j++) {
                if (this.visualizer.isPaused) break;
                
                // Visualization: Highlight current elements
                const highlights = {};
                highlights[j] = { color: '#48bb78', label: 'CURRENT' };
                highlights[j + 1] = { color: '#ed8936', label: 'COMPARING' };
                
                // Core Algorithm: Compare and swap
                if (this.visualizer.array[j] > this.visualizer.array[j + 1]) {
                    // Swap elements
                    [this.visualizer.array[j], this.visualizer.array[j + 1]] = 
                    [this.visualizer.array[j + 1], this.visualizer.array[j]];
                    this.visualizer.swaps++;
                }
                
                this.visualizer.comparisons++;
                await this.visualizer.sleep(); // Animation delay
            }
        }
    }
}
```

### **Key Points for Viva**
1. **Two nested loops**: Outer loop for passes, inner loop for comparisons
2. **Optimization**: Inner loop runs `n-i-1` times (largest element bubbles to end)
3. **Swap mechanism**: Uses destructuring assignment for clean swapping
4. **Visualization**: Shows current iterator and comparing elements
5. **Why it's called "Bubble"**: Largest elements "bubble up" to the end

---

## 🟢 Selection Sort (`algorithms/selectionSort.js`)

### **Algorithm Theory**
- **Time Complexity**: O(n²) - Always
- **Space Complexity**: O(1) - In-place sorting
- **Stability**: Unstable
- **Approach**: Find minimum element and place it at the beginning

### **Code Implementation Analysis**

```javascript
class SelectionSort {
    constructor(visualizer) {
        this.visualizer = visualizer;
    }

    async sort() {
        const n = this.visualizer.array.length;
        
        // Outer loop: Select position for minimum element
        for (let i = 0; i < n - 1; i++) {
            if (this.visualizer.isPaused) break;
            
            let minIndex = i; // Assume current position has minimum
            
            // Inner loop: Find actual minimum in remaining array
            for (let j = i + 1; j < n; j++) {
                if (this.visualizer.isPaused) break;
                
                // Visualization: Show current position, minimum, and checking element
                const highlights = {};
                highlights[i] = { color: '#3182ce', label: 'POSITION' };
                highlights[minIndex] = { color: '#48bb78', label: 'MIN' };
                highlights[j] = { color: '#ed8936', label: 'CHECKING' };
                
                // Core Algorithm: Update minimum index
                if (this.visualizer.array[j] < this.visualizer.array[minIndex]) {
                    minIndex = j;
                }
                
                this.visualizer.comparisons++;
                await this.visualizer.sleep();
            }
            
            // Swap minimum with current position (if different)
            if (minIndex !== i) {
                [this.visualizer.array[i], this.visualizer.array[minIndex]] = 
                [this.visualizer.array[minIndex], this.visualizer.array[i]];
                this.visualizer.swaps++;
            }
        }
    }
}
```

### **Key Points for Viva**
1. **Two phases**: Find minimum + Swap with current position
2. **Selection process**: Always finds the actual minimum in remaining array
3. **Why unstable**: Equal elements may change relative order during swapping
4. **Performance**: Always O(n²) regardless of input data
5. **Visualization**: Shows position, current minimum, and element being checked

---

## 🟠 Insertion Sort (`algorithms/insertionSort.js`)

### **Algorithm Theory**
- **Time Complexity**: O(n²) - Worst case, O(n) - Best case
- **Space Complexity**: O(1) - In-place sorting
- **Stability**: Stable
- **Approach**: Build sorted array one element at a time

### **Code Implementation Analysis**

```javascript
class InsertionSort {
    constructor(visualizer) {
        this.visualizer = visualizer;
    }

    async sort() {
        const n = this.visualizer.array.length;
        
        // Start from second element (index 1)
        for (let i = 1; i < n; i++) {
            if (this.visualizer.isPaused) break;
            
            let key = this.visualizer.array[i]; // Element to be inserted
            let j = i - 1; // Start comparing from previous element
            
            // Visualization: Show element being inserted
            const insertHighlights = {};
            insertHighlights[i] = { color: '#ed8936', label: 'INSERTING' };
            
            // Shift elements greater than key to the right
            while (j >= 0 && this.visualizer.array[j] > key) {
                if (this.visualizer.isPaused) break;
                
                // Visualization: Show comparison and shifting
                const compareHighlights = {};
                compareHighlights[j] = { color: '#ed8936', label: 'COMPARING' };
                compareHighlights[j + 1] = { color: '#f56565', label: 'SHIFTING' };
                
                // Core Algorithm: Shift element to the right
                this.visualizer.array[j + 1] = this.visualizer.array[j];
                this.visualizer.swaps++;
                j--; // Move to previous element
                
                this.visualizer.comparisons++;
                await this.visualizer.sleep();
            }
            
            // Insert key in correct position
            this.visualizer.array[j + 1] = key;
        }
    }
}
```

### **Key Points for Viva**
1. **Insertion process**: Like sorting playing cards in hand
2. **Key concept**: Each element finds its correct position in sorted portion
3. **Best case**: Already sorted array - O(n) time
4. **Shifting**: Elements are shifted, not swapped
5. **Why stable**: Equal elements maintain their relative order

---

## 🔴 Merge Sort (`algorithms/mergeSort.js`)

### **Algorithm Theory**
- **Time Complexity**: O(n log n) - Always
- **Space Complexity**: O(n) - Additional array space
- **Stability**: Stable
- **Approach**: Divide and conquer - Split array into halves, sort, then merge

### **Code Implementation Analysis**

```javascript
class MergeSort {
    constructor(visualizer) {
        this.visualizer = visualizer;
    }

    async sort() {
        // Start the recursive process
        await this.mergeSortHelper(0, this.visualizer.array.length - 1);
    }

    // Recursive function to divide array
    async mergeSortHelper(left, right) {
        if (left < right && !this.visualizer.isPaused) {
            const mid = Math.floor((left + right) / 2);
            
            // Recursively sort left and right halves
            await this.mergeSortHelper(left, mid);
            await this.mergeSortHelper(mid + 1, right);
            
            // Merge the sorted halves
            await this.merge(left, mid, right);
        }
    }

    // Merge two sorted subarrays
    async merge(left, mid, right) {
        // Create temporary arrays for left and right halves
        const leftArray = this.visualizer.array.slice(left, mid + 1);
        const rightArray = this.visualizer.array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left; // Indices for left, right, and merged array
        
        // Merge process: Compare elements from both arrays
        while (i < leftArray.length && j < rightArray.length) {
            if (this.visualizer.isPaused) break;
            
            // Visualization: Show elements being compared
            const mergeHighlights = {};
            mergeHighlights[left + i] = { color: '#ed8936', label: 'LEFT' };
            mergeHighlights[mid + 1 + j] = { color: '#ed8936', label: 'RIGHT' };
            
            // Core Algorithm: Choose smaller element
            if (leftArray[i] <= rightArray[j]) {
                this.visualizer.array[k] = leftArray[i];
                i++;
            } else {
                this.visualizer.array[k] = rightArray[j];
                j++;
            }
            
            this.visualizer.swaps++;
            await this.visualizer.sleep();
            k++;
        }
        
        // Copy remaining elements from left array
        while (i < leftArray.length && !this.visualizer.isPaused) {
            this.visualizer.array[k] = leftArray[i];
            i++; k++;
        }
        
        // Copy remaining elements from right array
        while (j < rightArray.length && !this.visualizer.isPaused) {
            this.visualizer.array[k] = rightArray[j];
            j++; k++;
        }
    }
}
```

### **Key Points for Viva**
1. **Divide and Conquer**: Split array recursively until single elements
2. **Merge process**: Combine two sorted arrays into one sorted array
3. **Recursive structure**: Each call splits array in half
4. **Space complexity**: Uses O(n) extra space for temporary arrays
5. **Why O(n log n)**: log n levels × n work at each level

---

## 🟣 Quick Sort (`algorithms/quickSort.js`)

### **Algorithm Theory**
- **Time Complexity**: O(n log n) - Average, O(n²) - Worst case
- **Space Complexity**: O(log n) - Recursion stack
- **Stability**: Unstable
- **Approach**: Choose pivot, partition array, recursively sort subarrays

### **Code Implementation Analysis**

```javascript
class QuickSort {
    constructor(visualizer) {
        this.visualizer = visualizer;
    }

    async sort() {
        // Start the recursive process
        await this.quickSortHelper(0, this.visualizer.array.length - 1);
    }

    // Recursive function to sort subarrays
    async quickSortHelper(low, high) {
        if (low < high && !this.visualizer.isPaused) {
            // Partition array and get pivot position
            const pivotIndex = await this.partition(low, high);
            
            // Recursively sort elements before and after pivot
            await this.quickSortHelper(low, pivotIndex - 1);
            await this.quickSortHelper(pivotIndex + 1, high);
        }
    }

    // Partition array around pivot
    async partition(low, high) {
        const pivot = this.visualizer.array[high]; // Choose last element as pivot
        let i = low - 1; // Index of smaller element (partition boundary)
        
        // Visualization: Highlight pivot
        const pivotHighlights = {};
        pivotHighlights[high] = { color: '#9f7aea', label: 'PIVOT' };
        
        // Partition process: Rearrange elements around pivot
        for (let j = low; j < high; j++) {
            if (this.visualizer.isPaused) break;
            
            // Visualization: Show pivot and current element
            const compareHighlights = {};
            compareHighlights[high] = { color: '#9f7aea', label: 'PIVOT' };
            compareHighlights[j] = { color: '#ed8936', label: 'COMPARING' };
            
            // Core Algorithm: If current element is smaller than pivot
            if (this.visualizer.array[j] < pivot) {
                i++; // Increment index of smaller element
                
                // Swap elements
                if (i !== j) {
                    [this.visualizer.array[i], this.visualizer.array[j]] = 
                    [this.visualizer.array[j], this.visualizer.array[i]];
                    this.visualizer.swaps++;
                }
            }
            
            this.visualizer.comparisons++;
            await this.visualizer.sleep();
        }
        
        // Place pivot in correct position
        [this.visualizer.array[i + 1], this.visualizer.array[high]] = 
        [this.visualizer.array[high], this.visualizer.array[i + 1]];
        this.visualizer.swaps++;
        
        return i + 1; // Return pivot position
    }
}
```

### **Key Points for Viva**
1. **Pivot selection**: Usually last element (can be first, middle, or random)
2. **Partition process**: Elements < pivot go left, elements ≥ pivot go right
3. **Recursive calls**: Sort left and right subarrays separately
4. **Worst case**: Already sorted array - O(n²) time
5. **Why unstable**: Equal elements may change relative order during partitioning

---

## 🏗️ Main Application Structure (`script.js`)

### **Core Components**

```javascript
class SortingVisualizer {
    constructor() {
        // Initialize algorithm instances
        this.algorithms = {
            bubble: new BubbleSort(this),
            selection: new SelectionSort(this),
            insertion: new InsertionSort(this),
            merge: new MergeSort(this),
            quick: new QuickSort(this)
        };
    }

    async startSorting() {
        // Use modular algorithm
        await this.algorithms[this.currentAlgorithm].sort();
    }

    // Visualization methods
    drawArray(highlights = {}) {
        // Draw bars with different colors and labels
    }

    // Utility methods
    async sleep() {
        return new Promise(resolve => setTimeout(resolve, this.getSpeedDelay()));
    }
}
```

---

## 🎯 Viva Questions & Answers

### **Q1: Why is Bubble Sort inefficient?**
**A:** Bubble Sort has O(n²) time complexity because it compares every element with every other element. It makes unnecessary comparisons even when the array is already sorted.

### **Q2: When would you use Selection Sort?**
**A:** Selection Sort is useful when the cost of swapping is high (like swapping large objects) because it makes only O(n) swaps, though it still has O(n²) comparisons.

### **Q3: Why is Insertion Sort good for small arrays?**
**A:** Insertion Sort has low overhead, is simple to implement, and performs well on small datasets. It's also adaptive - performs well on partially sorted arrays.

### **Q4: Explain the divide-and-conquer approach in Merge Sort.**
**A:** Merge Sort divides the array into two halves recursively until single elements, then merges them back in sorted order. This creates a balanced tree structure with log n levels.

### **Q5: What makes Quick Sort "quick"?**
**A:** Quick Sort is fast on average because it sorts in-place with O(log n) space complexity and has good cache performance. However, it can degrade to O(n²) in worst case.

### **Q6: Which algorithm is most stable?**
**A:** Bubble Sort, Insertion Sort, and Merge Sort are stable. Selection Sort and Quick Sort are unstable because they may change the relative order of equal elements.

### **Q7: How does the visualization help understand algorithms?**
**A:** The visualization shows:
- Current iterator position
- Elements being compared
- Swaps and movements
- Sorted portions
- Real-time performance metrics

---

## 📊 Algorithm Comparison Summary

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable |
|-----------|-----------|--------------|------------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |

---

## 🎓 Study Tips for Viva

1. **Understand the core concept** of each algorithm first
2. **Trace through the code** step by step with a small example
3. **Practice explaining** the visualization colors and labels
4. **Know the trade-offs** between time, space, and stability
5. **Be ready to explain** why certain algorithms are better for specific scenarios
6. **Understand the modular architecture** and how algorithms are integrated

---

*Good luck with your viva! This modular implementation makes it easy to understand each algorithm's behavior and implementation details.*
