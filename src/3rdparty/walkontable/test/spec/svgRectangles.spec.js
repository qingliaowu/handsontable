describe('getSvgRectangleRenderer', () => {
  let container;
  let svg;
  let svgRectangles;

  const totalWidth = 10;
  const totalHeight = 10;

  function callSvgRectangleRenderer(rawData) {
    const stylesAndStrokes = precalculateStrokes(rawData, totalWidth, totalHeight);
    const strokeStyles = [...stylesAndStrokes.keys()];
    const strokeLines = [...stylesAndStrokes.values()];
    svgRectangles(totalWidth, totalHeight, strokeStyles, strokeLines);
  }

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    container.innerHTML = '';
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.background = 'white';
    container.appendChild(svg);

    svgRectangles = getSvgRectangleRenderer(svg);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('stroke alignment of a rectangle in the middle', () => {
    it('should center 1px line exactly on the path', async() => {
      const rawData = [
        {
          x1: 2,
          x2: 7,
          y1: 2,
          y2: 7,
          topStroke: '1px #000',
          rightStroke: '1px #000',
          leftStroke: '1px #000',
          bottomStroke: '1px #000',
        }
      ];
      callSvgRectangleRenderer(rawData);
      return testSvgAsAsciiArt(svg, `
▯▯▯▯▯▯▯▯▯▯
▯▯▯▯▯▯▯▯▯▯
▯▯▮▮▮▮▮▮▯▯
▯▯▮▯▯▯▯▮▯▯
▯▯▮▯▯▯▯▮▯▯
▯▯▮▯▯▯▯▮▯▯
▯▯▮▯▯▯▯▮▯▯
▯▯▮▮▮▮▮▮▯▯
▯▯▯▯▯▯▯▯▯▯
▯▯▯▯▯▯▯▯▯▯`);
    });
    it('should center 2px on the path with a leak to the top-left', async() => {
      const rawData = [
        {
          x1: 2,
          x2: 7,
          y1: 2,
          y2: 7,
          topStroke: '2px #000',
          rightStroke: '2px #000',
          leftStroke: '2px #000',
          bottomStroke: '2px #000',
        }
      ];
      callSvgRectangleRenderer(rawData);
      return testSvgAsAsciiArt(svg, `
▯▯▯▯▯▯▯▯▯▯
▯▮▮▮▮▮▮▮▯▯
▯▮▮▮▮▮▮▮▯▯
▯▮▮▯▯▯▮▮▯▯
▯▮▮▯▯▯▮▮▯▯
▯▮▮▯▯▯▮▮▯▯
▯▮▮▮▮▮▮▮▯▯
▯▮▮▮▮▮▮▮▯▯
▯▯▯▯▯▯▯▯▯▯
▯▯▯▯▯▯▯▯▯▯`);
    });
    it('should center 3px line exactly on the path', async() => {
      const rawData = [
        {
          x1: 2,
          x2: 7,
          y1: 2,
          y2: 7,
          topStroke: '3px #000',
          rightStroke: '3px #000',
          leftStroke: '3px #000',
          bottomStroke: '3px #000',
        }
      ];
      callSvgRectangleRenderer(rawData);
      return testSvgAsAsciiArt(svg, `
▯▯▯▯▯▯▯▯▯▯
▯▮▮▮▮▮▮▮▮▯
▯▮▮▮▮▮▮▮▮▯
▯▮▮▮▮▮▮▮▮▯
▯▮▮▮▯▯▮▮▮▯
▯▮▮▮▯▯▮▮▮▯
▯▮▮▮▮▮▮▮▮▯
▯▮▮▮▮▮▮▮▮▯
▯▮▮▮▮▮▮▮▮▯
▯▯▯▯▯▯▯▯▯▯`);
    });
  });

  describe('stroke alignment of a rectangle that touches the edges vertically', () => {
    it('should center 1px line exactly on the path', async() => {
      const rawData = [
        {
          x1: 2,
          x2: 7,
          y1: 0,
          y2: 9,
          topStroke: '1px #000',
          rightStroke: '1px #000',
          leftStroke: '1px #000',
          bottomStroke: '1px #000',
        }
      ];
      callSvgRectangleRenderer(rawData);
      return testSvgAsAsciiArt(svg, `
▯▯▮▮▮▮▮▮▯▯
▯▯▮▯▯▯▯▮▯▯
▯▯▮▯▯▯▯▮▯▯
▯▯▮▯▯▯▯▮▯▯
▯▯▮▯▯▯▯▮▯▯
▯▯▮▯▯▯▯▮▯▯
▯▯▮▯▯▯▯▮▯▯
▯▯▮▯▯▯▯▮▯▯
▯▯▮▯▯▯▯▮▯▯
▯▯▮▮▮▮▮▮▯▯`);
    });
    it('should center 2px on the path with a leak to the top-left', async() => {
      const rawData = [
        {
          x1: 2,
          x2: 7,
          y1: 0,
          y2: 9,
          topStroke: '2px #000',
          rightStroke: '2px #000',
          leftStroke: '2px #000',
          bottomStroke: '2px #000',
        }
      ];
      callSvgRectangleRenderer(rawData);
      return testSvgAsAsciiArt(svg, `
▯▮▮▮▮▮▮▮▯▯
▯▮▮▮▮▮▮▮▯▯
▯▮▮▯▯▯▮▮▯▯
▯▮▮▯▯▯▮▮▯▯
▯▮▮▯▯▯▮▮▯▯
▯▮▮▯▯▯▮▮▯▯
▯▮▮▯▯▯▮▮▯▯
▯▮▮▯▯▯▮▮▯▯
▯▮▮▮▮▮▮▮▯▯
▯▮▮▮▮▮▮▮▯▯`);
    });
    it('should center 3px line exactly on the path', async() => {
      const rawData = [
        {
          x1: 2,
          x2: 7,
          y1: 0,
          y2: 9,
          topStroke: '3px #000',
          rightStroke: '3px #000',
          leftStroke: '3px #000',
          bottomStroke: '3px #000',
        }
      ];
      callSvgRectangleRenderer(rawData);
      return testSvgAsAsciiArt(svg, `
▯▮▮▮▮▮▮▮▮▯
▯▮▮▮▮▮▮▮▮▯
▯▮▮▮▮▮▮▮▮▯
▯▮▮▮▯▯▮▮▮▯
▯▮▮▮▯▯▮▮▮▯
▯▮▮▮▯▯▮▮▮▯
▯▮▮▮▯▯▮▮▮▯
▯▮▮▮▮▮▮▮▮▯
▯▮▮▮▮▮▮▮▮▯
▯▮▮▮▮▮▮▮▮▯`);
    });
  });

  describe('stroke alignment of a rectangle that touches the edges horizontally', () => {
    it('should center 1px line exactly on the path', async() => {
      const rawData = [
        {
          x1: 0,
          x2: 9,
          y1: 2,
          y2: 7,
          topStroke: '1px #000',
          rightStroke: '1px #000',
          leftStroke: '1px #000',
          bottomStroke: '1px #000',
        }
      ];
      callSvgRectangleRenderer(rawData);
      return testSvgAsAsciiArt(svg, `
▯▯▯▯▯▯▯▯▯▯
▯▯▯▯▯▯▯▯▯▯
▮▮▮▮▮▮▮▮▮▮
▮▯▯▯▯▯▯▯▯▮
▮▯▯▯▯▯▯▯▯▮
▮▯▯▯▯▯▯▯▯▮
▮▯▯▯▯▯▯▯▯▮
▮▮▮▮▮▮▮▮▮▮
▯▯▯▯▯▯▯▯▯▯
▯▯▯▯▯▯▯▯▯▯`);
    });
    it('should center 2px on the path with a leak to the top-left', async() => {
      const rawData = [
        {
          x1: 0,
          x2: 9,
          y1: 2,
          y2: 7,
          topStroke: '2px #000',
          rightStroke: '2px #000',
          leftStroke: '2px #000',
          bottomStroke: '2px #000',
        }
      ];
      callSvgRectangleRenderer(rawData);
      return testSvgAsAsciiArt(svg, `
▯▯▯▯▯▯▯▯▯▯
▮▮▮▮▮▮▮▮▮▮
▮▮▮▮▮▮▮▮▮▮
▮▮▯▯▯▯▯▯▮▮
▮▮▯▯▯▯▯▯▮▮
▮▮▯▯▯▯▯▯▮▮
▮▮▮▮▮▮▮▮▮▮
▮▮▮▮▮▮▮▮▮▮
▯▯▯▯▯▯▯▯▯▯
▯▯▯▯▯▯▯▯▯▯`);
    });
    it('should center 3px line exactly on the path', async() => {
      const rawData = [
        {
          x1: 0,
          x2: 9,
          y1: 2,
          y2: 7,
          topStroke: '3px #000',
          rightStroke: '3px #000',
          leftStroke: '3px #000',
          bottomStroke: '3px #000',
        }
      ];
      callSvgRectangleRenderer(rawData);
      return testSvgAsAsciiArt(svg, `
▯▯▯▯▯▯▯▯▯▯
▮▮▮▮▮▮▮▮▮▮
▮▮▮▮▮▮▮▮▮▮
▮▮▮▮▮▮▮▮▮▮
▮▮▮▯▯▯▯▮▮▮
▮▮▮▯▯▯▯▮▮▮
▮▮▮▮▮▮▮▮▮▮
▮▮▮▮▮▮▮▮▮▮
▮▮▮▮▮▮▮▮▮▮
▯▯▯▯▯▯▯▯▯▯`);
    });
  });
});
