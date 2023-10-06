const tooltipText = [
    {
        name: `<b><i>Crystals</i></b>`,
        description: function(){
            return `Your main currency in the game`
        },
        id: "crystals"
    },
    {
        name: `<b><i>Gems</i></b>`,
        description: function(){
            return `Prestige currency that meets once in million times`
        },
        req: function(){
            return `<b><i>You need to bank 50000 crystals to do prestige reset</b></i>`
        },
        id: "gems"
    },
    {
        name: `<b><i>Dust</i></b>`,
        description: function(){
            return `This resource you gain via gem shredding`
        },
        req: function(){
            return `<b><i>Each conversion costs for 1 gem and provides random amount of dust</b></i>`
        },
        id: "dust"
    },
]

const countElements = document.querySelectorAll('.count');

countElements.forEach((countElement) => {
    const id = countElement.id;
    const tooltipInfo = tooltipText.find((tooltip) => tooltip.id === id);

    if (tooltipInfo){
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.classList.add('res');

    countElement.addEventListener('mouseover', () => {
        tooltip.innerHTML = `<div class="tooltip-header"><h2>${tooltipInfo.name}</h2>`
        if (tooltipInfo.req){
        tooltip.innerHTML += `<div class="tooltip-header"><p style="margin-block: 0.25em;">${tooltipInfo.description()}</p>`;
        tooltip.innerHTML += `<p style="margin-block: 0.25em;">${tooltipInfo.req()}</p>`
        }
        else {
            tooltip.innerHTML += `<p style="margin-block: 0.25em;">${tooltipInfo.description()}</p>`;
        }
        tooltip.style.display = "block";
        tooltip.style.left = `${countElement.offsetLeft}px`;
        tooltip.style.top = `${countElement.offsetTop + 45}px`;
        
        countElement.appendChild(tooltip);
    });

    countElement.addEventListener('mouseout', () => {
        if (countElement.contains(tooltip)) {
                countElement.removeChild(tooltip);
            }
    });
}});