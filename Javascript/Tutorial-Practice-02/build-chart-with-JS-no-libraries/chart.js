class Chart {
	constructor(container, samples, options) {
		this.samples = samples;
		
		this.axesLabels = options.axesLabels;
		this.styles = options.styles;

		this.canvas = document.createElement('canvas');
		this.canvas.width = options.size;
		this.canvas.height = options.size;
		this.canvas.style = 'background-color: white;';
		container.appendChild(this.canvas);

		this.ctx = this.canvas.getContext('2d');

		this.margin = options.size * 0.1;
		this.transparency = 0.5;

		this.pixelBounds = this._getPixelBounds();
		this.dataBounds = this._getDataBounds();

		this._draw();
	}

	_getPixelBounds() {
		const { canvas, margin } = this;
		const bounds = {
			left: margin,
			right: canvas.width - margin,
			top: margin,
			bottom: canvas.height - margin,
		};
		return bounds;
	}

	_getDataBounds() {
		const { samples } = this;
		const x = samples.map(s => s.point[0]);
		const y = samples.map(s => s.point[1]);
		const minX = Math.min(...x);
		const maxX = Math.max(...x);
		const minY = Math.min(...y);
		const maxY = Math.max(...y);
		const bounds = {
			left: minX,
			right: maxX,
			top: maxY,
			bottom: minY,
		};
		return bounds;
	}

	_draw() {
		const { canvas, ctx } = this;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.globalAlpha = this.transparency;
		this._drawSamples();
		ctx.globalAlpha = 1;
	}

	_drawSamples() {
		const { ctx, samples, pixelBounds, dataBounds, styles } = this;

		for (const sample of samples) {
			const { point } = sample;
			const pixelLoc = [
				math.remap(dataBounds.left, dataBounds.right, pixelBounds.left, pixelBounds.right, point[0]),
				math.remap(dataBounds.top, dataBounds.bottom, pixelBounds.top, pixelBounds.bottom, point[1]),
			];
			graphics.drawPoint(ctx, pixelLoc);
		}
	}
}