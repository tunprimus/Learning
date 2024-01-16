

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

		const nodeRadius = NODE_RADIUS;
		for (let i = 0; i < level.inputs.length; i++) {
			const x = lerp(left, right, level.inputs.length === 1 ? 0.5 : i / (level.inputs.length - 1));
			ctx.beginPath();
			ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
			ctx.fillStyle = 'white';
			ctx.fill();
		}
	}
}
