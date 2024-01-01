class Segment {
	constructor(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	}

	equals(seg) {
		return this.includes(seg.p1) && this.includes(seg.p2);

		/* return ((this.p1 === seg.p1 && this.p2 === seg.p2) || (this.p1 === seg.p2 && this.p2 === seg.p1)); */
	}

	includes(point) {
		return (this.p1.equals(point) || this.p2.equals(point));
	}

	draw(ctx, width = 2, colour = 'black') {
		ctx.beginPath();
		ctx.lineWidth = width;
		ctx.strokeStyle = colour;
		ctx.moveTo(this.p1.x, this.p1.y);
		ctx.lineTo(this.p2.x, this.p2.y);
		ctx.stroke();
	}
}