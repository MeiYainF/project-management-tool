var characteristics = {
    uncertainty: 3,
    change: 3,
    limitations: 3,
    complexity: 3,
    impact: 3
};

var scores = [{
    score: 0,
    name: 'Digitalization Project',
    href: '#digitalization',
    characteristics: {
        uncertainty: 4,
        change: 5,
        limitations: 2,
        complexity: 3,
        impact: 5
    }
    }, {
    score: 0,
    name: 'ICT- og Software Project',
    href: '#ict-and-software',
    characteristics: {
        uncertainty: 3,
        change: 5,
        limitations: 1,
        complexity: 2,
        impact: 3
    }
    }, {
    score: 0,
    name: 'Reorganization/Restructuring Project',
    href: '#reorganization/restructuring',
    characteristics: {
        uncertainty: 4,
        change: 5,
        limitations: 3,
        complexity: 1,
        impact: 4
    }
    }, {
    score: 0,
    name: 'New Product Development Project',
    href: '#new-product-development',
    characteristics: {
        uncertainty: 3,
        change: 5,
        limitations: 2,
        complexity: 2,
        impact: 5
    }
    }, {
    score: 0,
    name: 'Construction Project',
    href: '#construction',
    characteristics: {
        uncertainty: 3,
        change: 2,
        limitations: 3,
        complexity: 4,
        impact: 5
    }
    }, {
    score: 0,
    name: 'Research Project And Studies',
    href: '#research-and-studies',
    characteristics: {
        uncertainty: 5,
        change: 3,
        limitations: 4,
        complexity: 2,
        impact: 2
    }
}];

var previousResult = '';

function updateCharacteristic(value, characteristic) {
    this.characteristics[characteristic] = value;
    document.getElementById(characteristic).innerText = this.characteristics[characteristic];

    var results = [];
    this.scores.forEach((project) => {
        const characteristics = Object.keys(this.characteristics);

        project.score = 0;
        characteristics.forEach((characteristic) => {
            project.score += Math.abs(project.characteristics[characteristic] - this.characteristics[characteristic])
        });

        results.push(project)
    });
    results = results.sort(function(a, b) {return a.score - b.score});

    if (this.previousResult === results[0].name) {
        document.getElementById('score').style.opacity = 0;
        setTimeout(function() {
            document.getElementById('score').innerText = results[0].score;
            document.getElementById('score').style.opacity = 1;
        }, 300);
    } else {
        document.getElementsByClassName('best-match-container').item(0).style.opacity = 0;
        setTimeout(function() {
            document.getElementById('best-match').children[0].innerHTML = results[0].name;
            document.getElementById('best-match').href = results[0].href;
            document.getElementById('score').innerText = results[0].score;
            document.getElementById('comparison-uncertainty').innerText = results[0].characteristics.uncertainty;
            document.getElementById('comparison-change').innerText = results[0].characteristics.change;
            document.getElementById('comparison-limitations').innerText = results[0].characteristics.limitations;
            document.getElementById('comparison-complexity').innerText = results[0].characteristics.complexity;
            document.getElementById('comparison-impact').innerText = results[0].characteristics.impact;
            document.getElementsByClassName('best-match-container').item(0).style.opacity = 1;
        }, 300)
    }

    this.previousResult = results[0].name;
}

function resetCharacteristics() {
    const characteristics = Object.keys(this.characteristics);
    characteristics.forEach((characteristic, i) => {
        this.characteristics[characteristic] = 3;
        document.getElementById(characteristic).innerText = 3;
        document.getElementsByClassName('characteristic-range').item(i + 1).value = 3;
    });

    document.getElementsByClassName('best-match-container').item(0).style.opacity = 0;
}
