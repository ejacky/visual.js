Visual.Box = function(scene, opts) {
  opts = opts || {};

  this.axis    = opts.axis   || new THREE.Vector3(1, 0, 0);

  this._length = opts.length || this.axis.length();
  this._height = opts.height || 1;
  this._width  = opts.width  || 1;

  Visual.BaseObject.call(this, scene, opts);
};

Visual.Util.inherits(Visual.Box, Visual.BaseObject);

Object.defineProperties(Visual.Box.prototype, {
  _buildMesh: {
    value: function() {
      var geometry = new THREE.CubeGeometry(this._length, this._height, this._width, 1, 1, 1);
      var material = new THREE.MeshLambertMaterial({ color: this.color });
      var mesh = new THREE.Mesh(geometry, material);
      return mesh;
    }
  },
  update: {
    value: function() {
      this.mesh.lookAt(this.axis);
    }
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
  height: {
    get: function() {
      return this._height;
    },
    set: function(v) {
      this._height = v;
      this._updateMesh();
    }
  },
  width: {
    get: function() {
      return this._width;
    },
    set: function(v) {
      this._width = v;
      this._updateMesh();
    }
  }
});

Visual.Scene.registerObject('box', Visual.Box);
