# Sorting Algorithm Visualizer

A web-based interactive tool that visually demonstrates how different sorting algorithms work on the same dataset. Built with HTML, CSS, and JavaScript, this application provides real-time visualization of sorting processes with performance metrics.

## 🚀 Features

### Sorting Algorithms
- **Bubble Sort** - Simple comparison-based algorithm
- **Selection Sort** - Finds minimum element and places it at the beginning
- **Insertion Sort** - Builds sorted array one element at a time
- **Merge Sort** - Divide and conquer algorithm with stable sorting
- **Quick Sort** - Efficient divide and conquer with pivot-based partitioning

### Visualization Features
- **Bar Chart Display** - Vertical bars representing array values
- **Color Coding** - Different colors for comparisons, swaps, and sorted elements
- **Real-time Animation** - Step-by-step visualization of sorting process
- **Interactive Controls** - Play, pause, reset functionality

### Data Management
- **Random Array Generation** - Generate arrays with 5-100 elements
- **Custom Input** - Enter your own array values
- **Array Size Control** - Adjustable slider for array size

### Performance Tracking
- **Comparisons Counter** - Track number of element comparisons
- **Swaps Counter** - Track number of element swaps
- **Execution Time** - Real-time timing of sorting operations
- **Algorithm Comparison** - Compare different algorithms on the same data

### User Experience
- **Speed Control** - Three speed settings (Slow, Medium, Fast)
- **Responsive Design** - Works on desktop and mobile devices
- **Modern UI** - Clean, intuitive interface with glassmorphism design
- **Status Messages** - Real-time feedback on operations

## 🎯 How to Use

1. **Generate Data**
   - Use the slider to set array size (5-100 elements)
   - Click "Generate Random" for random data
   - Click "Custom Input" to enter your own values

2. **Select Algorithm**
   - Choose from 5 available sorting algorithms
   - Only one algorithm can be selected at a time

3. **Control Playback**
   - Click "Start" to begin sorting animation
   - Use "Pause" to pause mid-sorting
   - Click "Reset" to restore original array

4. **Adjust Speed**
   - Select from Slow, Medium, or Fast speeds
   - Speed affects animation timing, not algorithm efficiency

5. **Monitor Performance**
   - Watch real-time metrics during sorting
   - Compare different algorithms on the same data

## 🎨 Color Legend

- **Blue (#667eea)** - Default/unsorted elements
- **Green (#48bb78)** - Current iterator/active element
- **Orange (#ed8936)** - Elements being compared
- **Red (#f56565)** - Elements being swapped/moved
- **Purple (#9f7aea)** - Pivot element (Quick Sort)
- **Dark Green (#38a169)** - Sorted elements
- **Light Blue (#3182ce)** - Position markers (Selection Sort) / Boundary markers (Quick Sort)
- **White borders** - Highlighted elements for better visibility

## 🏗️ Technical Implementation

### Architecture
- **Frontend Only** - Pure HTML, CSS, JavaScript implementation
- **Modular Design** - Each sorting algorithm in separate files for maintainability
- **Canvas Rendering** - HTML5 Canvas for smooth animations
- **Object-Oriented Design** - Clean class-based JavaScript architecture
- **Event-Driven** - Responsive user interface with event listeners
- **Separation of Concerns** - Main application logic separated from algorithm implementations

### Algorithm Complexity
| Algorithm | Time Complexity | Space Complexity | Stability |
|-----------|----------------|------------------|-----------|
| Bubble Sort | O(n²) | O(1) | Stable |
| Selection Sort | O(n²) | O(1) | Unstable |
| Insertion Sort | O(n²) | O(1) | Stable |
| Merge Sort | O(n log n) | O(n) | Stable |
| Quick Sort | O(n log n) | O(log n) | Unstable |

### File Structure
```
├── index.html                    # Main HTML structure
├── styles.css                    # CSS styling and responsive design
├── script.js                     # Main JavaScript application logic
├── algorithms/                   # Modular sorting algorithm implementations
│   ├── bubbleSort.js            # Bubble Sort algorithm
│   ├── selectionSort.js         # Selection Sort algorithm
│   ├── insertionSort.js         # Insertion Sort algorithm
│   ├── mergeSort.js             # Merge Sort algorithm
│   └── quickSort.js             # Quick Sort algorithm
├── test.html                     # Test page for verification
└── README.md                     # Project documentation
```

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in a modern web browser
3. **Start Visualizing** - No additional setup required!

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎓 Educational Value

This visualizer is perfect for:
- **Computer Science Students** - Understanding algorithm behavior
- **Educators** - Teaching sorting concepts visually
- **Developers** - Comparing algorithm performance
- **Interview Preparation** - Visualizing sorting algorithms

## 🔧 Customization

### Adding New Algorithms
1. Create a new file in the `algorithms/` directory (e.g., `heapSort.js`)
2. Implement a class that follows the same pattern as existing algorithms:
   ```javascript
   class HeapSort {
       constructor(visualizer) {
           this.visualizer = visualizer;
       }
       
       async sort() {
           // Your algorithm implementation here
           // Use this.visualizer.array to access the array
           // Use this.visualizer.drawArray(highlights) for visualization
           // Use this.visualizer.sleep() for animation timing
           // Use this.visualizer.comparisons++ and this.visualizer.swaps++ for metrics
       }
   }
   ```
3. Add the script tag to `index.html`:
   ```html
   <script src="algorithms/heapSort.js"></script>
   ```
4. Add the algorithm to the `algorithms` object in `script.js`:
   ```javascript
   this.algorithms = {
       // ... existing algorithms
       heap: new HeapSort(this)
   };
   ```
5. Add a button to the HTML algorithm selection section

### Modifying Visualization
- Adjust colors in CSS variables
- Modify animation timing in `getSpeedDelay()` method
- Change bar styling in `drawArray()` method
- Update color schemes in individual algorithm files

## 📈 Performance Notes

- **Large Arrays** (50+ elements) may have slower animations
- **Fast Speed** setting recommended for larger datasets
- **Memory Usage** scales linearly with array size
- **Animation Smoothness** depends on browser performance

## 🤝 Contributing

Feel free to contribute by:
- Adding new sorting algorithms
- Improving visualization effects
- Enhancing user interface
- Adding new features

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Sorting! 🎉**

