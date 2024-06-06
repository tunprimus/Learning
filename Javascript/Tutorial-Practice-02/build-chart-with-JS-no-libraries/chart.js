class Chart {
	constructor(container, samples, options) {
		this.samples = samples;
		
		this.axesLabels = options.axesLabels;
		this.styles = options.styles;
		this.icon = options.icon;

		this.canvas = document.createElement('canvas');
		this.canvas.width = options.size;
		this.canvas.height = options.size;
		this.canvas.style = 'background-color: white;';
		container.appendChild(this.canvas);

		this.ctx = this.canvas.getContext('2d');

		this.margin = options.size * 0.1;
		this.transparency = 0.7;

		this.dataTrans = {
			offset: [0, 0],
			scale: 1,
		};
		this.dragInfo = {
			start: [0, 0],
			end: [0, 0],
			offset: [0, 0],
			dragging: false,
		};

		this.pixelBounds = this._getPixelBounds();
		this.dataBounds = this._getDataBounds();
		this.defaultDataBounds = this._getDataBounds();

		this._draw();

		this._addEventListeners();
	}

	_addEventListeners() {
		const { canvas, dataTrans, dragInfo } = this;

		canvas.onmousedown = (evt) => {
			const dataLoc = this._getMouse(evt, true);
			dragInfo.start = dataLoc;
			dragInfo.dragging = true;
		}

		canvas.onmousemove = (evt) => {
			if (dragInfo.dragging) {
				const dataLoc = this._getMouse(evt, true);
				dragInfo.end = dataLoc;
				dragInfo.offset = math.scale(math.subtract(dragInfo.start, dragInfo.end), dataTrans.scale);
				const newOffset = math.scale(math.add(dataTrans.offset, dragInfo.offset), dataTrans.scale);
				this._updateDataBounds(newOffset, dataTrans.scale);
				this._draw();
			}
		}

		canvas.onmouseup = () => {
			dataTrans.offset = math.add(dataTrans.offset, dragInfo.offset);
			dragInfo.dragging = false;
		}

		canvas.onwheel = (evt) => {
			const direction = Math.sign(evt.deltaY);
			const step = 0.02;
			dataTrans.scale += direction * step;
			dataTrans.scale = Math.max(step, Math.min(2, dataTrans.scale));
			this._updateDataBounds(dataTrans.offset, dataTrans.scale);
			this._draw();
			evt.preventDefault();
		}
	}

	_updateDataBounds(offset, scale) {
		const { dataBounds, defaultDataBounds:def } = this;
		dataBounds.left = def.left + offset[0];
		dataBounds.right = def.right + offset[0];
		dataBounds.top = def.top + offset[1];
		dataBounds.bottom = def.bottom + offset[1];

		const centre = [
			(dataBounds.left + dataBounds.right) / 2,
			(dataBounds.top + dataBounds.bottom) / 2,
		];

		dataBounds.left = math.lerp(centre[0], dataBounds.left, scale ** 2);
		dataBounds.right = math.lerp(centre[0], dataBounds.right, scale ** 2);
		dataBounds.top = math.lerp(centre[1], dataBounds.top, scale ** 2);
		dataBounds.bottom = math.lerp(centre[1], dataBounds.bottom, scale ** 2);
	}

	_getMouse (evt, dataSpace = false) {
		const rect = this.canvas.getBoundingClientRect();
		const pixelLoc = [
			evt.clientX - rect.left,
			evt.clientY - rect.top,
		];
		if (dataSpace) {
			const dataLoc = math.remapPoint(this.pixelBounds, this.defaultDataBounds, pixelLoc);
			return dataLoc;
		}
		return pixelLoc;
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

		this._drawAxes();
		ctx.globalAlpha = this.transparency;
		this._drawSamples();
		ctx.globalAlpha = 1;
	}

	_drawAxes() {
		const { ctx, canvas, axesLabels, margin } = this;
		const { left, right, top, bottom } = this.pixelBounds;

		graphics.drawText(ctx, {
			text: axesLabels[0],
			loc: [canvas.width / 2, bottom + margin / 2],
			size: margin * 0.618,
		});
		ctx.save();

		ctx.translate(left - margin / 2, canvas.height / 2);
		ctx.rotate(-Math.PI / 2);
		graphics.drawText(ctx, {
			text: axesLabels[1],
			loc: [0, 0],
			size: margin * 0.618,
		});
		ctx.restore();

		ctx.beginPath();
		ctx.moveTo(left, top);
		ctx.lineTo(left, bottom);
		ctx.lineTo(right, bottom);
		ctx.setLineDash([5, 4]);
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'lightgrey';
		ctx.stroke();
		ctx.setLineDash([]);

		const dataMin = math.remapPoint(this.pixelBounds, this.dataBounds, [left, bottom]);

		graphics.drawText(ctx, {
			text: math.formatNumber(dataMin[0], 2),
			loc: [left, bottom],
			size: margin * 0.309,
			align: 'left',
			vAlign: 'top',
		});
		ctx.save();

		ctx.translate(left, bottom);
		ctx.rotate(-Math.PI / 2);
		graphics.drawText(ctx, {
			text: math.formatNumber(dataMin[1], 2),
			loc: [0, 0],
			size: margin * 0.309,
			align: 'left',
			vAlign: 'bottom',
		});
		ctx.restore();

		const dataMax = math.remapPoint(this.pixelBounds, this.dataBounds, [right, top]);

		graphics.drawText(ctx, {
			text: math.formatNumber(dataMax[0], 2),
			loc: [right, bottom],
			size: margin * 0.309,
			align: 'right',
			vAlign: 'top',
		});
		ctx.save();

		ctx.translate(left, top);
		ctx.rotate(-Math.PI / 2);
		graphics.drawText(ctx, {
			text: math.formatNumber(dataMax[1], 2),
			loc: [0, 0],
			size: margin * 0.309,
			align: 'right',
			vAlign: 'bottom',
		});
		ctx.restore();
	}

	_drawSamples() {
		const { ctx, samples, pixelBounds, dataBounds } = this;

		for (const sample of samples) {
			const { point, label } = sample;
			const pixelLoc = math.remapPoint(dataBounds, pixelBounds, point);
			switch (this.icon) {
				case 'image':
					graphics.drawImage(ctx, this.styles[label].image, pixelLoc);
					break;
				case 'text':
					graphics.drawText(ctx, {text: this.styles[label].text, loc: pixelLoc, size: 20,});
					break;
				default:
					graphics.drawPoint(ctx, pixelLoc, this.styles[label].colour);
					break;
			}
		}
	}
}