class slot { constructor(id, quantity) { this.id = id; this.quantity = quantity; } }

var items = [
    " oporra ",
    "../resources/items/blocks/oak_log.png",
    "../resources/items/blocks/oak_planks.png",
    "../resources/items/blocks/cobblestone.png",
    "../resources/items/iron_ingot.png",
    "../resources/items/diamond.png",
    "../resources/items/stick.png",
    "../resources/items/coal.png",
    "../resources/items/torch.png",
    "../resources/items/blocks/crafting_table.png",
    "../resources/items/blocks/furnace.png",
    "../resources/items/blocks/chest.png",
    "../resources/items/tools/wood/wooden_sword.png",
    "../resources/items/tools/wood/wooden_pickaxe.png",
    "../resources/items/tools/wood/wooden_axe.png",
    "../resources/items/tools/wood/wooden_shovel.png",
    "../resources/items/tools/wood/wooden_hoe.png",
    "../resources/items/tools/stone/stone_sword.png",
    "../resources/items/tools/stone/stone_pickaxe.png",
    "../resources/items/tools/stone/stone_axe.png",
    "../resources/items/tools/stone/stone_shovel.png",
    "../resources/items/tools/stone/stone_hoe.png",
    "../resources/items/tools/iron/iron_sword.png",
    "../resources/items/tools/iron/iron_pickaxe.png",
    "../resources/items/tools/iron/iron_axe.png",
    "../resources/items/tools/iron/iron_shovel.png",
    "../resources/items/tools/iron/iron_hoe.png",
    "../resources/items/tools/diamond/diamond_sword.png",
    "../resources/items/tools/diamond/diamond_pickaxe.png",
    "../resources/items/tools/diamond/diamond_axe.png",
    "../resources/items/tools/diamond/diamond_shovel.png",
    "../resources/items/tools/diamond/diamond_hoe.png",
]

var inventory = [
    new slot(0,0), new slot(0,0), new slot(0,0), new slot(0,0), new slot(0,0), new slot(0,0),
    new slot(0,0), new slot(0,0), new slot(0,0), new slot(0,0), new slot(0,0), new slot(0,0),
    new slot(0,0), new slot(0,0), new slot(0,0), new slot(0,0), new slot(0,0), new slot(0,0),
    new slot(0,0), new slot(0,0)
]

const output = inventory.length - 1;
function CreateIcon(target) {
    var icon = document.createElement("img");
    icon.src = items[inventory[target].id];
    document.getElementById(target).appendChild(icon);
}

function CreateCounter(target) {
    var counter = document.createElement("a");
    counter.text = inventory[target].quantity;
    document.getElementById(target).appendChild(counter);
}

function ClearSlot(target) {
    var parent = document.getElementById(target)
    parent.innerHTML = "";
}

function UpdateSingle(target) {
    ClearSlot(target);
    if(inventory[target].id != 0) {
        CreateIcon(target);
        if(inventory[target].quantity > 1)
            CreateCounter(target);
    } else ClearSlot(target);
}

function UpdateAll() {
    for(let index = 0; index < inventory.length; index++)
        UpdateSingle(index);
}

function UpdateTable() {
    for(let index = 1; index < 10; index++) {
        inventory[index].quantity--;
        if(inventory[index].quantity < 1) {
            ClearSlot(index);
            inventory[index].id = 0;
            inventory[index].quantity = 0;
        } UpdateSingle(index);
    }
}

function ResetInventory() {
    for(let index = 0; index < inventory.length; index++)
    { inventory[index].id = 0; inventory[index].quantity = 0; }
    inventory[10] = new slot(1,4); inventory[11] = new slot(3,32);
    inventory[12] = new slot(4,32); inventory[13] = new slot(5,32);
    UpdateAll();
}

function Search(item) {
    for(let index = 0; index < inventory.length; index++)
    { if(inventory[index].id == item) return true; }
    return false;
}

function LeftClick(target) {
    if(target < output) {
        if(inventory[0].id == inventory[target].id) {
            if(inventory[target].quantity > 63) {
                var temp = inventory[target];
                inventory[target] = inventory[0];
                inventory[0] = temp;
            } else {
                inventory[target].quantity += inventory[0].quantity;
                if(inventory[target].quantity > 64) {
                    var extra = inventory[target].quantity - 64;
                    inventory[target].quantity = 64;
                    inventory[0].quantity = extra;
                } else inventory[0] = new slot(0, 0);
            }
        } else {
            var temp = inventory[target];
            inventory[target] = inventory[0];
            inventory[0] = temp;
        }
    } else {
        if(inventory[output].quantity > 0) {
            if(inventory[0].id < 1) {
                inventory[0] = inventory[output];
                inventory[output] = new slot(0, 0);
                UpdateTable();
            }
            if(inventory[0].id == inventory[output].id) {
                inventory[0].quantity += inventory[output].quantity;
                inventory[output] = new slot(0, 0);
                UpdateTable();
            }
        } else return;
    } UpdateSingle(target); UpdateSingle(0); CheckTable();
}

function RightClick(target) {
    if(target < output) {
        if(inventory[0].quantity > 0) {
            if(inventory[0].id == inventory[target].id) {
                if(inventory[target].quantity + 1 < 65) {
                    inventory[0].quantity--;
                    inventory[target].quantity++;
                    if(inventory[0].quantity < 1)
                        inventory[0] = new slot(0, 0);
                } else return;
            } else if(inventory[target].id < 1) {
                inventory[target].id = inventory[0].id;
                inventory[target].quantity = 1;
                inventory[0].quantity--;
                if(inventory[0].quantity < 1)
                    inventory[0] = new slot(0, 0);
            } else {
                var temp = inventory[target];
                inventory[target] = inventory[0];
                inventory[0] = temp;
            }
        } else {
            if(inventory[target].quantity > 1) {
                inventory[0].id = inventory[target].id;
                var amount = inventory[target].quantity;
                inventory[0].quantity = Math.ceil(amount / 2);
                inventory[target].quantity = Math.floor(amount / 2);
            } else {
                var temp = inventory[target];
                inventory[target] = inventory[0];
                inventory[0] = temp;
            }
        }
    } else {
        if(inventory[output].quantity > 0) {
            if(inventory[0].id < 1) {
                inventory[0] = inventory[output];
                inventory[output] = new slot(0, 0);
                UpdateTable();
            }
            if(inventory[0].id == inventory[output].id) {
                inventory[0].quantity += inventory[output].quantity;
                inventory[output] = new slot(0, 0);
                UpdateTable();
            }
        } else return;
    } UpdateSingle(target); UpdateSingle(0); CheckTable();
}

function CheckTable() {
    var table = inventory.slice(1, 10);
    var pattern = "", total = 0, item, amount;
    for(let x = 0; x < table.length; x++) {
        total += table[x].id;
        if(table[x].id != 0) pattern += table[x].id;
        else pattern += " ";
    }
    pattern = parseInt(pattern.trim().replaceAll(' ', '0'));
    switch (pattern) {
        case 1: { item = 2; amount = 4; break; }
        case 2002: { item = 6; amount = 4; break; }
        case 7006: { item = 7; amount = 4; break; }
        case 22022: {item = 9; amount = 1; break; }
        case 333303333: { item = 10; amount = 1; break; }
        case 222202222: { item = 11; amount = 1; break; }
        case 2002006: { item = 12; amount = 1; break; }
        case 22206006: { item = 13; amount = 1; break; }
        case 22026006: { item = 14; amount = 1; break; }
        case 2006006: { item = 15; amount = 1; break; }
        case 22006006: { item = 16; amount = 1; break; }
        case 3003006: { item = 17; amount = 1; break; }
        case 33306006: { item = 18; amount = 1; break; }
        case 33036006: { item = 19; amount = 1; break; }
        case 3006006: { item = 20; amount = 1; break; }
        case 33006006: { item = 21; amount = 1; break; }
        case 4004006: { item = 22; amount = 1; break; }
        case 44406006: { item = 23; amount = 1; break; }
        case 44046006: { item = 24; amount = 1; break; }
        case 4006006: { item = 25; amount = 1; break; }
        case 44006006: { item = 26; amount = 1; break; }
        case 5005006: { item = 27; amount = 1; break; }
        case 55506006: { item = 28; amount = 1; break; }
        case 55056006: { item = 29; amount = 1; break; }
        case 5006006: { item = 30; amount = 1; break; }
        case 55006006: { item = 31; amount = 1; break; }
        default: { item = 0; amount = 0; break; }
    }
    inventory[output].id = item;
    inventory[output].quantity = amount;
    UpdateSingle(output);
}

let hoverItem = document.getElementById("0");
document.body.onpointermove = event => {
    const { clientX, clientY } = event;
    hoverItem.animate({left: `${clientX}px`, top:`${clientY}px`}, {duration: 0, fill: "forwards"})
}
UpdateAll()