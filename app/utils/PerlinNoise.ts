// app/utils/PerlinNoise.ts
export class PerlinNoise {
    private gradients: Record<string, { x: number; y: number }>;
    private memory: Record<string, number>;
    private seed: number;
  
    constructor(seed = 1) {
      this.gradients = {};
      this.memory = {};
      this.seed = seed;
    }
  
    private rand(n: number): number {
      n = (n << 13) ^ n;
      const t = (n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff;
      return 1.0 - t * 0.931322574615479e-9;
    }
  
    private gradient(xi: number, yi: number): { x: number; y: number } {
      const random = 2920 * Math.sin(xi * 21942 + yi * 171324 + 8912) * Math.cos(xi * 23157 * yi * 217832 + 9758);
      return {
        x: Math.cos(random),
        y: Math.sin(random),
      };
    }
  
    private dot(g: { x: number; y: number }, x: number, y: number): number {
      return g.x * x + g.y * y;
    }
  
    private smoothstep(t: number): number {
      return t * t * (3 - 2 * t);
    }
  
    noise(x: number, y: number): number {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;
  
      const tlg = this.gradient(xi, yi);
      const trg = this.gradient(xi + 1, yi);
      const blg = this.gradient(xi, yi + 1);
      const brg = this.gradient(xi + 1, yi + 1);
  
      const tl = this.dot(tlg, xf, yf);
      const tr = this.dot(trg, xf - 1, yf);
      const bl = this.dot(blg, xf, yf - 1);
      const br = this.dot(brg, xf - 1, yf - 1);
  
      const u = this.smoothstep(xf);
      const v = this.smoothstep(yf);
  
      const top = tl + u * (tr - tl);
      const bottom = bl + u * (br - bl);
  
      return top + v * (bottom - top);
    }
  
    octaveNoise(x: number, y: number, octaves = 4, persistence = 0.5, scale = 0.01): number {
      let value = 0;
      let amplitude = 1;
      let frequency = scale;
      let maxValue = 0;
  
      for (let i = 0; i < octaves; i++) {
        value += this.noise(x * frequency, y * frequency) * amplitude;
        maxValue += amplitude;
        amplitude *= persistence;
        frequency *= 2;
      }
  
      return value / maxValue;
    }
  }