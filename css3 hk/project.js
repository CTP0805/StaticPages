
const Utils = {
    color(index) {
        return 'rgb(54, 162, 235)';
    },
    transparentize(color, opacity = 0.5) {
        return color.replace('rgb', 'rgba').replace(')', `, ${1 - opacity})`);
    }
};

const data = {
    labels: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    datasets: [{
        data: [90, 85, 60, 40, 20]
    }]
};

    function getLineColor(ctx) {
    return Utils.color(ctx.datasetIndex);
}

function alternatePointStyles(ctx) {
  const index = ctx.dataIndex;
  return index % 2 === 0 ? 'circle' : 'rect';
}

function makeHalfAsOpaque(ctx) {
  return Utils.transparentize(getLineColor(ctx));
}

function make20PercentOpaque(ctx) {
  return Utils.transparentize(getLineColor(ctx), 0.8);
}

function adjustRadiusBasedOnData(ctx) {
  const v = ctx.parsed.y;
  return v < 10 ? 5
    : v < 25 ? 7
    : v < 50 ? 9
    : v < 75 ? 11
    : 6;
}

const config = {
  type: 'radar',
  data: data,
  options: {
    devicePixelRatio: window.devicePixelRatio || 2,
    plugins: {
    legend: false,
    tooltip: false,
    maintainAspectRatio: false,
    },

      scales: {
    r: {
      beginAtZero: true,
      pointLabels: {
        font: {
          size: 11   //  外圈字
        },
      },

      ticks: {
        stepSize: 20,
        backdropColor: 'transparent',
        font: {
          size: 14,   //  中間
        }
      }
    }
  },
    elements: {
      line: {
        backgroundColor: make20PercentOpaque,
        borderColor: getLineColor,
      },
      point: {
        backgroundColor: getLineColor,
        hoverBackgroundColor: makeHalfAsOpaque,
        radius: adjustRadiusBasedOnData,
        pointStyle: alternatePointStyles,
        hoverRadius: 15,
      }
    }
  }
};

const ctx = document.getElementById('myChart');
new Chart(ctx, config);

particlesJS.load('particles-js', './particlesjs-config.json');

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});