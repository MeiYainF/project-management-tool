var characteristics = {
    uncertainty: 3,
    change: 3,
    limitations: 3,
    complexity: 3,
    impact: 3
};

var characteristicNames = {
    uncertainty: 'Uncertainty',
    change: 'Change',
    limitations: 'Limitations',
    complexity: 'Organizational complexity',
    impact: 'Impact on business'
};

var projects = [{
    score: 0,
    name: 'Digitalization Project',
    tableId: 'digitalization-table',
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
    tableId: 'ict-table',
    href: '#ict-and-software',
    characteristics: {
        uncertainty: 3,
        change: 5,
        limitations: 1,
        complexity: 2,
        impact: 4
    }
    }, {
    score: 0,
    name: 'Reorganization/Restructuring Project',
    tableId: 'reorganization-table',
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
    tableId: 'new-product-dev-table',
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
    tableId: 'construction-table',
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
    tableId: 'research-table',
    href: '#research-and-studies',
    characteristics: {
        uncertainty: 5,
        change: 3,
        limitations: 4,
        complexity: 2,
        impact: 2
    }
}];

var characteristicKeys = Object.keys(characteristics);
var previousResult = '';

function updateCharacteristic(value, characteristic) {
    this.characteristics[characteristic] = value;
    document.getElementById(characteristic).innerText = this.characteristics[characteristic];

    var results = [];
    this.projects.forEach((project) => {
        project.score = 0;
        this.characteristicKeys.forEach((characteristic) => {
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

            this.characteristicKeys.forEach((characteristic) => {
                document.getElementById('comparison-' + characteristic).innerText =
                    results[0].characteristics[characteristic];
            });
            document.getElementsByClassName('best-match-container').item(0).style.opacity = 1;
        }, 300)
    }

    this.previousResult = results[0].name;
}

function resetCharacteristics() {
    this.characteristicKeys.forEach((characteristic, i) => {
        this.characteristics[characteristic] = 3;
        document.getElementById(characteristic).innerText = 3;
        document.getElementsByClassName('characteristic-range').item(i + 1).value = 3;
    });

    document.getElementsByClassName('best-match-container').item(0).style.opacity = 0;
}

window.onload = function onLoad() {
    this.createCharacteristicTables()
};

function createCharacteristicTables() {
    this.projects.forEach((project) => {
        const tableHeaderNode = document.createElement('tr');
        for (i = 0; i < 6; i++) {
            const headerColumnNode = document.createElement('th');
            if (i !== 0) {
                headerColumnNode.innerText = i
            }
            tableHeaderNode.appendChild(headerColumnNode)
        }
        document.getElementById(project.tableId).appendChild(tableHeaderNode);

        this.characteristicKeys.forEach((characteristic) => {
            const tableRowNode = document.createElement('tr');
            for (i = 0; i < 6; i++) {
                const rowColumnNode = document.createElement('td');
                if (i === 0) {
                    rowColumnNode.innerText = this.characteristicNames[characteristic]
                } else if (i === project.characteristics[characteristic]) {
                    rowColumnNode.innerText = 'X'
                }
                tableRowNode.appendChild(rowColumnNode)
            }
            document.getElementById(project.tableId).appendChild(tableRowNode);
        })
    })
}
