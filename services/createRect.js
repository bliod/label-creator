const createRect = (context, data) => {
  data.forEach((element) => {
    context.fillStyle = element.color;
    context.font = element.font;
    context.fillText(
      element.text,
      element.position?.x,
      element.position?.y,
      element.width
    );
  });
};

module.exports = createRect;
