function Vector3(x, y, isPoint) {
    this.x = x;
    this.y = y;
    this.isPoint = isPoint;
    return this;
}

Vector3.prototype.add = function(other) {
    return new Vector3(this.x + other.x, this.y + other.y, this.isPoint + other.isPoint);
};
Vector3.prototype.sub = function(other) {
    return new Vector3(this.x - other.x, this.y - other.y, this.isPoint - other.isPoint );
};
Vector3.prototype.mul = function(other) {
    return new Vector3(this.x*other.x, this.y*other.y, this.isPoint*other.isPoint);
};
Vector3.prototype.getLength = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.isPoint * this.isPoint);
};
Vector3.prototype.dot = function(other) {
    return this.x * other.x
        + this.y * other.y
        + this.isPoint * other.isPoint;
};

Vector3.vector = function(x, y) {
    return new Vector3(x,y,0);
}

Vector3.point = function(x, y) {
    return new Vector3(x,y,1);
}

function Matrix3(
    m11, m12, m13,
    m21, m22, m23,
    m31, m32, m33
) {
    this.m11 = m11; this.m12 = m12; this.m13 = m13;
    this.m21 = m21; this.m22 = m22; this.m23 = m23;
    this.m31 = m31; this.m32 = m32; this.m33 = m33;
    return this;
};

Matrix3.prototype.mul = function( other ) {
    if( other instanceof Vector3 ) {
        return new Vector3(
            this.m11 * other.x + this.m12 * other.y + this.m13 * other.isPoint,
            this.m21 * other.x + this.m22 * other.y + this.m23 * other.isPoint,
            this.m31 * other.x + this.m32 * other.y + this.m33 * other.isPoint
        );
    }
    if( other instanceof Matrix3 ) {
        return new Matrix3(
            this.m11 * other.m11 + this.m12 * other.m21 + this.m13 * other.m31,
            this.m11 * other.m12 + this.m12 * other.m22 + this.m13 * other.m32,
            this.m11 * other.m13 + this.m12 * other.m23 + this.m13 * other.m33,

            this.m21 * other.m11 + this.m22 * other.m21 + this.m23 * other.m31,
            this.m21 * other.m12 + this.m22 * other.m22 + this.m23 * other.m32,
            this.m21 * other.m13 + this.m22 * other.m23 + this.m23 * other.m33,

            this.m31 * other.m11 + this.m32 * other.m21 + this.m33 * other.m31,
            this.m31 * other.m12 + this.m32 * other.m22 + this.m33 * other.m32,
            this.m31 * other.m13 + this.m32 * other.m23 + this.m33 * other.m33
        );
    }
	if( other instanceof Array ) {
		var self = this;
		return other.map( function( v ) {
			return self.mul( v );
		} );
	}
    throw "unknown other type";
};

Matrix3.identity = function() {
  return new Matrix3(
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  );
};

Matrix3.rotate = function(angle) {
  return new Matrix3(
      Math.cos(angle), Math.sin(angle), 0,
      -Math.sin(angle), Math.cos(angle), 0,
      0, 0, 1
  );
};

Matrix3.translate = function(delta) {
    return new Matrix3(
        1, 0, delta.x,
        0, 1, delta.y,
        0, 0, 1
    );
};

Matrix3.scale = function(unit) {
    return new Matrix3(
        unit.x, 0, 0,
        0, unit.y, 0,
        0, 0, 1
    );
};
