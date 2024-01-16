

const MARGIN = 50;
const NODE_RADIUS = 18;
const VISUALISER_LINE_WIDTH = 2;

class Visualiser {
	static drawNetwork(ctx, network) {
		const left = MARGIN;
		const top = MARGIN;
		const width = ctx.canvas.width - MARGIN * 2;
		const height = ctx.canvas.height - MARGIN * 2;

		Visualiser.drawLevel(ctx, network.levels[0], left, top, width, height);
	}

	static drawLevel(ctx, level, left, top, width, height) {
		const right = left + width;
		const bottom = top + height;

		const {inputs, outputs} = level;

		for (let i = 0; i < inputs.length; i++) {
			for (let j = 0; j < outputs.length; j++) {
				ctx.beginPath();
				ctx.moveTo(Visualiser._getNodeX(inputs, i, left, right), bottom);
				ctx.lineTo(Visualiser._getNodeX(outputs, j, left, right), top);
				ctx.lineWidth = VISUALISER_LINE_WIDTH;
				ctx.strokeStyle = 'orange';
				ctx.stroke();
			}
		}

		const nodeRadius = NODE_RADIUS;
		for (let i = 0; i < inputs.length; i++) {
			const x = Visualiser._getNodeX(inputs, i, left, right);
			ctx.beginPath();
			ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
			ctx.fillStyle = 'white';
			ctx.fill();
		}

		for (let i = 0; i < outputs.length; i++) {
			const x = Visualiser._getNodeX(outputs, i, left, right);
			ctx.beginPath();
			ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
			ctx.fillStyle = 'white';
			ctx.fill();
		}
	}

	static _getNodeX(nodes, index, left, right) {
		return lerp(left, right, nodes.length === 1 ? 0.5 : index / (nodes.length - 1));
	}
}
