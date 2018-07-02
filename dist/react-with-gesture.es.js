import React from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var withGesture = function withGesture(Wrapped) {
  return (
    /*#__PURE__*/
    function (_React$Component) {
      _inheritsLoose(_class2, _React$Component);

      function _class2() {
        var _temp, _this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return (_temp = _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this, _this.state = {
          x: 0,
          y: 0,
          xDelta: 0,
          yDelta: 0,
          xInitial: 0,
          yInitial: 0,
          xPrev: 0,
          yPrev: 0,
          down: false
        }, _this.handleTouchStart = function (e) {
          return _this.handleMouseDown(e.touches[0]);
        }, _this.handleTouchMove = function (e) {
          return _this.handleMouseMove(e.touches[0]);
        }, _this.handleMouseUp = function () {
          window.removeEventListener('touchmove', _this.handleTouchMove);
          window.removeEventListener('touchend', _this.handleMouseUp);
          window.removeEventListener('mousemove', _this.handleMouseMoveRaf);
          window.removeEventListener('mouseup', _this.handleMouseUp);

          var newProps = _extends({}, _this.state, {
            down: false
          });

          _this.props.onUp ? _this.props.onUp(newProps) : null;

          _this.setState(newProps);
        }, _this.handleMouseDown = function (_ref) {
          var pageX = _ref.pageX,
              pageY = _ref.pageY;
          window.addEventListener('touchmove', _this.handleTouchMove);
          window.addEventListener('touchend', _this.handleMouseUp);
          window.addEventListener('mousemove', _this.handleMouseMoveRaf);
          window.addEventListener('mouseup', _this.handleMouseUp);

          var newProps = _extends({}, _this.state, {
            x: pageX,
            y: pageY,
            xDelta: 0,
            yDelta: 0,
            xInitial: pageX,
            yInitial: pageY,
            xPrev: pageX,
            yPrev: pageY,
            down: true
          });

          _this.props.onDown ? _this.props.onDown(newProps) : null;

          _this.setState(newProps);
        }, _this.handleMouseMoveRaf = function (_ref2) {
          var pageX = _ref2.pageX,
              pageY = _ref2.pageY;
          !_this._busy && requestAnimationFrame(function () {
            return _this.handleMouseMove({
              pageX: pageX,
              pageY: pageY
            });
          });
          _this._busy = true;
        }, _this.handleMouseMove = function (_ref3) {
          var pageX = _ref3.pageX,
              pageY = _ref3.pageY;

          var newProps = _extends({}, _this.state, {
            x: pageX,
            y: pageY,
            xDelta: pageX - _this.state.xInitial,
            yDelta: pageY - _this.state.yInitial,
            xPrev: _this.state.x,
            yPrev: _this.state.y,
            xVelocity: pageX - _this.state.x,
            yVelocity: pageY - _this.state.y
          });

          _this.setState(_this.props.onMove ? _this.props.onMove(newProps) : newProps, function () {
            return _this._busy = false;
          });
        }, _temp) || _assertThisInitialized(_this);
      }

      var _proto = _class2.prototype;

      _proto.render = function render() {
        var _props = this.props,
            style = _props.style,
            className = _props.className,
            props = _objectWithoutProperties(_props, ["style", "className"]);

        return React.createElement("div", {
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart,
          style: _extends({
            display: 'contents'
          }, style),
          className: className
        }, React.createElement(Wrapped, _extends({}, props, this.state)));
      };

      return _class2;
    }(React.Component)
  );
};

var Gesture =
/*#__PURE__*/
withGesture(
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(_class3, _React$PureComponent);

  function _class3() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto2 = _class3.prototype;

  _proto2.render = function render() {
    return this.props.children(this.props);
  };

  return _class3;
}(React.PureComponent));

export { withGesture, Gesture };
