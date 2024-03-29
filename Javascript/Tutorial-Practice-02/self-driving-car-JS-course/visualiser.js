

const MARGIN = 50;
const NODE_RADIUS = 18;
const VISUALISER_LINE_WIDTH = 2;
const NODE_SCALE_FACTOR = 0.6;
const BIASES_SCALE_FACTOR = 0.8;
const OUTPUT_LABELS_SCALE = 1.2;
const OUTPUT_LABELS_OFFSET = 0.05;

class Visualiser {
	static drawNetwork(ctx, network) {
		const left = MARGIN;
		const top = MARGIN;
		const width = ctx.canvas.width - MARGIN * 2;
		const height = ctx.canvas.height - MARGIN * 2;

		const levelHeight = height / network.levels.length;

		for (let i = network.levels.length - 1; i >= 0; i--) {
			const levelTop = top + lerp(height - levelHeight, 0, network.levels.length === 1 ? 0.5 : i / (network.levels.length - 1));
			ctx.setLineDash([7, 3]);
			Visualiser.drawLevel(ctx, network.levels[i], left, levelTop, width, levelHeight, i === network.levels.length - 1 ? ['\u2B06', '\u2B05', '\u27A1', '\u2B07'] : []);
		}
	}

	static drawLevel(ctx, level, left, top, width, height, outputLabels) {
		const right = left + width;
		const bottom = top + height;

		const {inputs, outputs, weights, biases} = level;

		for (let i = 0; i < inputs.length; i++) {
			for (let j = 0; j < outputs.length; j++) {
				ctx.beginPath();
				ctx.moveTo(Visualiser._getNodeX(inputs, i, left, right), bottom);
				ctx.lineTo(Visualiser._getNodeX(outputs, j, left, right), top);
				ctx.lineWidth = VISUALISER_LINE_WIDTH;
				ctx.strokeStyle = getRGBA(weights[i][j]);
				ctx.stroke();
			}
		}

		const nodeRadius = NODE_RADIUS;
		for (let i = 0; i < inputs.length; i++) {
			const x = Visualiser._getNodeX(inputs, i, left, right);
			ctx.beginPath();
			ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
			ctx.fillStyle = 'black';
			ctx.fill();

			ctx.beginPath();
			ctx.arc(x, bottom, nodeRadius * NODE_SCALE_FACTOR, 0, Math.PI * 2);
			ctx.fillStyle = getRGBA(inputs[i]);
			ctx.fill();
		}

		for (let i = 0; i < outputs.length; i++) {
			const x = Visualiser._getNodeX(outputs, i, left, right);
			ctx.beginPath();
			ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
			ctx.fillStyle = 'black';
			ctx.fill();

			ctx.beginPath();
			ctx.arc(x, top, nodeRadius * NODE_SCALE_FACTOR, 0, Math.PI * 2);
			ctx.fillStyle = getRGBA(outputs[i]);
			ctx.fill();

			ctx.beginPath();
			ctx.lineWidth = VISUALISER_LINE_WIDTH;
			ctx.arc(x, top, nodeRadius * BIASES_SCALE_FACTOR, 0, Math.PI * 2);
			ctx.strokeStyle = getRGBA(biases[i]);
			ctx.setLineDash([3, 3]);
			ctx.stroke();
			ctx.setLineDash([]);

			if (outputLabels[i]) {
				ctx.beginPath();
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillStyle = 'white';
				ctx.strokeStyle = 'black';
				ctx.font = (nodeRadius * OUTPUT_LABELS_SCALE) + 'px Arial';
				ctx.fillText(outputLabels[i], x, top + nodeRadius * OUTPUT_LABELS_OFFSET);
				ctx.lineWidth = 0.5;
				ctx.strokeText(outputLabels[i], x, top + nodeRadius * OUTPUT_LABELS_OFFSET);
			}
		}
	}

	static _getNodeX(nodes, index, left, right) {
		return lerp(left, right, nodes.length === 1 ? 0.5 : index / (nodes.length - 1));
	}
}
