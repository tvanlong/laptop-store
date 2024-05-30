export const priceOptions = [
  { param: 'price_max', label: 'Dưới 10 triệu', value: 10000000 },
  {
    param: ['price_min', 'price_max'],
    label: '10 triệu - 20 triệu',
    value: [10000000, 20000000]
  },
  {
    param: ['price_min', 'price_max'],
    label: '20 triệu - 40 triệu',
    value: [20000000, 40000000]
  },
  {
    param: ['price_min', 'price_max'],
    label: '40 triệu - 60 triệu',
    value: [40000000, 60000000]
  },
  {
    param: ['price_min', 'price_max'],
    label: '60 triệu - 80 triệu',
    value: [60000000, 80000000]
  },
  { param: 'price_min', label: 'Trên 80 triệu', value: 80000000 }
]

export const screenSizeOptions = [
  { param: 'screen', label: '13.3 inch', value: '13.3 inch' },
  { param: 'screen', label: '14 inch', value: '14 inch' },
  { param: 'screen', label: '15.6 inch', value: '15.6 inch' }
]

export const ramOptions = [
  { param: 'ram', label: '4GB', value: '4GB' },
  { param: 'ram', label: '8GB', value: '8GB' },
  { param: 'ram', label: '16GB', value: '16GB' },
  { param: 'ram', label: '32GB', value: '32GB' },
  { param: 'ram', label: '64GB', value: '64GB' }
]

export const memoryOptions = [
  { param: 'memory', label: '128GB', value: '128GB' },
  { param: 'memory', label: '256GB', value: '256GB' },
  { param: 'memory', label: '512GB', value: '512GB' },
  { param: 'memory', label: '1TB', value: '1TB' }
]

export const cpuOptions = [
  { param: 'cpu', label: 'Core i3', value: 'Core i3' },
  { param: 'cpu', label: 'Core i5', value: 'Core i5' },
  { param: 'cpu', label: 'Core i7', value: 'Core i7' },
  { param: 'cpu', label: 'Core i9', value: 'Core i9' },
  { param: 'cpu', label: 'Ryzen 3', value: 'Ryzen 3' },
  { param: 'cpu', label: 'Ryzen 5', value: 'Ryzen 5' },
  { param: 'cpu', label: 'Ryzen 7', value: 'Ryzen 7' },
  { param: 'cpu', label: 'Ryzen 9', value: 'Ryzen 9' }
]

export const vgaOptions = [
  { param: 'vga', label: 'Intel', value: 'Intel' },
  { param: 'vga', label: 'NVIDIA', value: 'NVIDIA' },
  { param: 'vga', label: 'AMD', value: 'AMD' }
]
