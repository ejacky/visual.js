Visual.Cylinder = function(scene, opts) {
  opts = opts || {};

  this._length = opts.length || 1;
  this._radius = opts.radius || 1;

  Visual.Primitive.call(this, scene, opts);
};

Visual.Util.inherits(Visual.Cylinder, Visual.Primitive);

Object.defineProperties(Visual.Cylinder.prototype, {
  _buildMesh: {
    value: function() {
      var geometry = new THREE.CylinderGeometry(this._radius, this._radius, this._length, 24);
      var vertices = geometry.vertices;
      // rotate all the vertices to align the axis of the cylinder with the x-axis.
      var rotationMatrix = new THREE.Matrix4();
      var axis = new THREE.Vector3(1, 0, 0);
      var angle = -Math.PI / 2;
      rotationMatrix.setRotationAxis(axis, angle);
      for (var i = 0, l = vertices.length; i < l; ++i) {
        rotationMatrix.multiplyVector3(vertices[i].position);
      }
      geometry.computeFaceNormals();

      var material = new THREE.MeshLambertMaterial({ color: this._color });
      var mesh = new THREE.Mesh(geometry, material);
      return mesh;
    },
  },

  length: {
    get: function() {
      return this._length;
    },
    set: function(v) {
      this._length = v;
      this._updateMesh();
    }
  },

  radius: {
    get: function() {
      return this._radius;
    },
    set: function(v) {
      this._radius = v;
      this._updateMesh();
    }
  },
});

Visual.Scene.registerObject('cylinder', Visual.Cylinder);
