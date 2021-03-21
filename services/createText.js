const createText = (context, data) => {
  data.forEach((element) => {
    context.lineWidth = element.stroke?.size;
    context.strokeStyle = element.stroke?.color;
    context.strokeRect(
      element.position?.x,
      element.position?.y,
      element.width,
      element.height
    );
  });
};

module.exports = createText;
