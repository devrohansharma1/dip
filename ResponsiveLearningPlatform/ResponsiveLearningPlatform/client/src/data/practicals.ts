type CodeSnippet = {
  language: string;
  code: string;
  title?: string;
};

type Example = {
  input?: string;
  output?: string;
};

export type PracticalType = {
  id: number;
  title: string;
  shortDescription: string;
  aim?: string;
  steps?: string[];
  algorithm?: string[];
  codeSnippets: CodeSnippet[];
  examples?: Example[];
  prevId?: number;
  nextId?: number;
  image?: string;
};

export const practicals: PracticalType[] = [
  {
    id: 1,
    title: "Linear Convolution",
    shortDescription: "Learn how to implement linear convolution operations.",
    aim: "Linear Convolution",
    steps: [
      "Accept the input sequence using the input method and store it in variable x.",
      "Accept another input sequence to be convolved and store it in variable h.",
      "Find the lengths of x and h, store them in n1 and n2 respectively.",
      "Find the maximum length of the input sequences and store it in n.",
      "Calculate the output sequence length as n = n1 + n2 - 1.",
      "Zero-padding: Extend x and h with zeros from 1 to n-1.",
      "Obtain the time reversal of h(k) → h(-k).",
      "Shift the sequence to obtain h(n-k).",
      "Perform multiplication of h(n-k) with x(k) and sum over k.",
      "Store the final result as the convolution output."
    ],
    codeSnippets: [
      {
        language: "Scilab",
        title: "Scilab Code for Linear Convolution",
        code: `// Read input sequences
x = input("Enter first sequence x: ");
h = input("Enter second sequence h: ");

// Get lengths
n1 = length(x);
n2 = length(h);

// Output sequence length
n = n1 + n2 - 1;

// Zero-padding
x = [x, zeros(1, n - n1)];
h = [h, zeros(1, n - n2)];

// Convolution operation
y = zeros(1, n);
for i = 1:n
   for j = 1:i
      y(i) = y(i) + x(j) * h(i-j+1);
   end
end

// Display result
disp("Linear Convolution Output: ");
disp(y);

// Plotting the input and output sequences
subplot(3,1,1);
plot2d3(nx, x);
xtitle("Input Sequence x[n]");

subplot(3,1,2);
plot2d3(nh, h);
xtitle("Impulse Response h[n]");

subplot(3,1,3);
plot2d3(ny, y);
xtitle("Linear Convolution Output y[n]");`
      }
    ],
    examples: [
      {
        input: "x = [1, 2, 3, 4];\nh = [1, 2, 1, 2];",
        output: "y = [1 4 8 13 12 10 8]"
      }
    ],
    nextId: 2
  },
  {
    id: 2,
    title: "Circular Convolution",
    shortDescription: "Implementing circular convolution in image processing context.",
    steps: [
      "Accept the first input sequence (image or signal) and store it in variable x.",
      "Accept the second input sequence (filter or kernel) and store it in variable h.",
      "Find the length of x (let it be N1) and h (let it be N2).",
      "Compute N = max(N1, N2) (for circular convolution, both sequences should have the same length).",
      "If x and h are not of length N, pad them with zeros to make their lengths equal to N.",
      "Initialize an output sequence y of length N with zeros.",
      "For each index n = 0 to N-1, calculate: y(n)=∑k=0^(N−1) x(k)⋅h((n−k)mod N)",
      "Display the circular convolution result y.",
      "Plot the original sequences x and h, along with the output y, using subplot() in Scilab."
    ],
    codeSnippets: [
      {
        language: "Scilab",
        code: `g = input("Enter first sequence: ");
o = input("Enter second sequence: ");

n1 = length(g);
n2 = length(o);
n = max(n1, n2);
n3 = n1 - n2;

if (n3 > 0)
  o = [o, zeros(1, n3)];
else
  g = [g, zeros(1, -n3)];
end

y = zeros(1, n);

for p = 1:n
  y(p) = 0;
  for q = 1:n
       k = p - q + 1;
       if k < 1
           k = k + n;
       end
       y(p) = y(p) + g(q) * o(k);
  end
end

disp("Circular Convolution result: ");
disp(y);

plot(y);`
      }
    ],
    prevId: 1,
    nextId: 3
  },
  {
    id: 3,
    title: "Image Quantization",
    shortDescription: "Apply quantization to reduce color depth in images.",
    algorithm: [
      "Read the input image using imread() and convert it to double precision using double().",
      "Find the maximum pixel intensity using max().",
      "Prompt the user to enter the number of quantization bits using input().",
      "Compute the quantization step size as: c = max intensity / 2^a",
      "Apply quantization by dividing pixel values by c, using floor().",
      "Normalize the quantized image to an 8-bit range by scaling it with 255/max(f).",
      "Display the original and quantized images using imshow()."
    ],
    codeSnippets: [
      {
        language: "Scilab",
        code: `// Read the input image
img = imread("image1.jpg");
// Convert image to double for calculations
img_double = double(img);
// Find the maximum pixel intensity value
b = max(img_double);
// Get the number of quantization bits from the user
a = input("Enter the number of quantization bits: "); //eg.1
or 2 or 4 or 8
// Define quantization levels
levels = 2^a; // Total quantization levels
step = b / (levels - 1); // Step size for quantization
// Perform quantization
f = floor(img_double / step) * step;
// Normalize and scale the quantized image
f1 = (f / max(f)) * 255;
// Display original and quantized images
figure;
imshow(uint8(img));
title("Original Image");
figure;
imshow(uint8(f1));
title("Quantized Image");`
      }
    ],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&h=300",
    prevId: 2,
    nextId: 4
  },
  {
    id: 4,
    title: "FFT and Inverse FFT",
    shortDescription: "Working with Fast Fourier Transform for signal processing.",
    aim: "Perform the FFT and the inverse FFT for the given sequence.",
    algorithm: [
      "Accept the two input sequences from the user and store them in variables x and h.",
      "Find the length of the two sequences by using the length() method and store it in the variables m and n, respectively.",
      "Find the value for the variable N by using the relation: N = m + n - 1",
      "Append zeros in the variable x and h from m to N-m and n to N-n, respectively.",
      "Find the FFT of the input sequence x and store it in the variable F1. Also, find the FFT of the sequence h and store it in the variable F2.",
      "Perform element-wise multiplication of F1 and F2 in the frequency domain and store the result in F3.",
      "Compute the inverse FFT of F3 and store the result in F4.",
      "Display the values of F4 using the subplot method, followed by plot2d() or plot() methods for visualization. Repeat this step for the input sequence x and the impulse response sequence h."
    ],
    codeSnippets: [
      {
        language: "Scilab",
        code: `// Take input for two vectors
g = input("Enter the first vector g (as a row vector): ");
h = input("Enter the second vector h (as a row vector): ");

// Get the lengths of the vectors
m = length(g);
n = length(h);

// Compute the length for zero-padding
N = m + n - 1;

// Zero-padding to match the required length
g = [g, zeros(1, N - m)];
h = [h, zeros(1, N - n)];

// Compute FFT of both signals
f1 = fft(g);
f2 = fft(h);

// Perform element-wise multiplication
f3 = f1 .* f2;

// Compute Inverse FFT to get the convolution result
f4 = ifft(f3);

// Plot results
subplot(3,1,1);
plot2d3(1:N, h);
xtitle("Impulse Sequence");

subplot(3,1,2);
plot2d3(1:N, g);
xtitle("Input Sequence");

subplot(3,1,3);
plot2d3(1:N, f4);
xtitle("Output Sequence (Convolution Result)");`
      }
    ],
    prevId: 3,
    nextId: 5
  },
  {
    id: 5,
    title: "Image Negative and Thresholding",
    shortDescription: "Create image negatives and apply thresholding operations.",
    aim: "Write the code for obtaining the negative of the image and perform the thresholding operation on the given image.",
    algorithm: [
      "Read the input image using imread() and convert it to double for precision.",
      "Initialize the variable for the max gray value (255) and subtract the image pixel values from this value to get the negative image.",
      "Display the original image and its negative using the figure() and imshow() functions.",
      "For the thresholding operation, read the input image again and store it in a separate variable.",
      "Store the image pixel values in a variable and use the size() method to determine the number of rows and columns.",
      "Ask the user to input the threshold value and store it in a variable.",
      "Use a for loop to iterate through all pixel values from 1 to max row value and 1 to max column value.",
      "Use an if conditional statement to check if the pixel value is less than the threshold value, then set the pixel to 0; otherwise, set it to 255.",
      "Display the original image and the thresholded image using imshow() and figure()."
    ],
    codeSnippets: [
      {
        language: "Scilab",
        code: `// Read the input image
img = imread("image1.jpg");
d = double(img); // Convert to double precision
c = 255;
neg = c - d; // Compute negative image

// Display Original and Negative Image
figure(1);
imshow(img);
title("Original Image");

figure(2);
imshow(uint8(neg)); // Convert back to uint8 for correct display
title("Negative Image");

// Read image again for thresholding
i = imread("image1.jpg");
d = double(i); // Convert again to double

// Define a fixed threshold value
threshold = 128; // Predefined threshold value (Adjust if needed)

// Get image size
[rows, cols] = size(d);

// Apply thresholding
op = zeros(rows, cols); // Initialize thresholded image

for r = 1:rows
   for c = 1:cols
      if d(r, c) < threshold then
          op(r, c) = 0; // Set pixel to black
      else
          op(r, c) = 255; // Set pixel to white
      end
   end
end

// Display Thresholded Image
figure(3);
imshow(uint8(op));
title("Thresholded Image");

// Display duplicate of original image
figure(4);
imshow(i);
title("Duplicate of Original Image");`
      }
    ],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=500&h=300",
    prevId: 4,
    nextId: 6
  },
  {
    id: 6,
    title: "High-Pass and Low-Pass Filtering",
    shortDescription: "Apply different filters to enhance or smooth image features.",
    algorithm: [
      "Read the input image and store it in variable a1 using imread().",
      "Convert the image into a double format and store it in a for processing.",
      "Determine the size of the image using size() and store the values in m and n.",
      "Define a 3×3 high-pass filter (HPF) for edge detection and a 3×3 low-pass filter (LPF) for smoothing.",
      "Initialize two zero matrices, hp and lp, of the same size as the image to store the filtered results.",
      "Apply filtering using a 3×3 mask by performing convolution.",
      "For each pixel (excluding border pixels), multiply the corresponding 3×3 region of the image with the HPF and sum the results to store in hp.",
      "Repeat the same process using the LPF and store the result in lp.",
      "Convert the filtered images hp and lp back to an 8-bit format using uint8().",
      "Display the original image, high-pass filtered image, and low-pass filtered image using subplot() and imshow()."
    ],
    codeSnippets: [
      {
        language: "Scilab",
        code: `a1 = imread("image3.jpg");
a = double(a1);

// Image size ko 50% reduce karna
//a = imresize(a, 0.5);

[m, n] = size(a);
disp("New Image Size: " + string(m) + " x " + string(n));

hw = [-1, -1, -1;
   -1, 8, -1;
   -1, -1, -1]; // High-pass filter

lw = [1, 1, 1;
    1, 1, 1;
    1, 1, 1] / 9; // Low-pass filter

hp = zeros(m, n);
lp = zeros(m, n);
for i = 2:m-1
   for j = 2:n-1
      // High-pass filtering (edge detection)
      hp(i, j) = (hw(1) * a(i-1, j-1) + hw(2) * a(i-1, j) + hw(3) * a(i-1, j+1) + ...
               hw(4) * a(i, j-1) + hw(5) * a(i, j) + hw(6) * a(i, j+1) + ...
               hw(7) * a(i+1, j-1) + hw(8) * a(i+1, j) + hw(9) * a(i+1, j+1));

    // Low-pass filtering (smoothing)
    lp(i, j) = (lw(1) * a(i-1, j-1) + lw(2) * a(i-1, j) + lw(3) * a(i-1, j+1) + ...
              lw(4) * a(i, j-1) + lw(5) * a(i, j) + lw(6) * a(i, j+1) + ...
              lw(7) * a(i+1, j-1) + lw(8) * a(i+1, j) + lw(9) * a(i+1, j+1));
  end
end

hp = uint8(hp);
lp = uint8(lp);

subplot(1, 3, 1);
imshow(a1);
title("Original Image");

subplot(1, 3, 2);
imshow(hp);
title("High-pass Filtered Image");

subplot(1, 3, 3);
imshow(lp);
title("Low-pass Filtered Image");`
      }
    ],
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=500&h=300",
    prevId: 5,
    nextId: 7
  },
  {
    id: 7,
    title: "Hadamard Technique",
    shortDescription: "Implement the Hadamard technique for image processing.",
    aim: "Implement Hadamard technique on the given image and analyze changes with the input.",
    steps: [
      "Load the image using imread() and store it in variable a.",
      "Convert the image to a double-precision array using double() and store it in variable a.",
      "Extract the number of rows and columns using size() and store them in variables m and n, respectively.",
      "Define a 3x3 median filter w with all elements set to 1.",
      "Use nested loops to iterate through the image pixels (from the second to the second-last row and column to avoid edge issues).",
      "For each pixel, create a 3x3 neighborhood of the pixel.",
      "Multiply the elements of w with the corresponding neighborhood pixel values and store the result in variable b.",
      "Sort b in ascending order using gsort() and store the sorted array in variable b2.",
      "Extract the median value (5th element of b2) and store it in d(i, j).",
      "Convert the d matrix to uint8 for proper image display.",
      "Display the original image and the median-filtered image using imshow()."
    ],
    codeSnippets: [],
    prevId: 6
  }
];
