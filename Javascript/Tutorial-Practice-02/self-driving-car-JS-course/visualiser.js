

const MARGIN = 50;
const NODE_RADIUS = 18;

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

		const nodeRadius = NODE_RADIUS;
		for (let i = 0; i < inputs.length; i++) {
			const x = lerp(left, right, inputs.length === 1 ? 0.5 : i / (inputs.length - 1));
			ctx.beginPath();
			ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
			ctx.fillStyle = 'white';
			ctx.fill();
		}

		for (let i = 0; i < outputs.length; i++) {
			const x = lerp(left, right, outputs.length === 1 ? 0.5 : i / (outputs.length - 1));
			ctx.beginPath();
			ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
			ctx.fillStyle = 'white';
			ctx.fill();
		}
	}
}
