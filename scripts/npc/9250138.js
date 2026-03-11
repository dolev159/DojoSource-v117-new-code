function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var categories = {
    cubes: [
        [5062000, 0],  // Miracle Cube (reduced from 8000)
        [5062001, 0],  // Premium Cube (reduced from 12000)
        [5062002, 0]   // Super Miracle Cube (reduced from 20000)
    ],
    cubePacks: [
        [5062000, 0],  // Miracle Cube Pack (10x) - 20% discount
        [5062001, 0],  // Premium Cube Pack (10x) - 20% discount
        [5062002, 0]  // Super Miracle Cube Pack (10x)
    ],
    potential: [
        [2049401, 0],  // Potential Scroll (reduced from 4000)
        [2531000, 0],  // pot scroll
        [2530002, 0]  // lucky
    ],
    enhance: [
        [2049307, 0],  // Enhancement Scroll (reduced from 7000)
        [2049306, 0],  // AEE
        [2049119, 0],  // ICOG
        [2049116, 0],  // MCHAOS
        [2049005, 0],  // CSS 20
        [5570000, 0]  // Hammer
    ],
    magnifyingGlass: [
        [2460000, 0],  // Magnifying Glass (reduced from 500)
        [2460001, 0],  // Magnifying Glass (reduced from 1000)
        [2460002, 0],  // Magnifying Glass (reduced from 1500)
        [2460003, 0]   // Magnifying Glass (reduced from 2000)
    ],
    nebulite: [
        [2930000, 0],  // Socket Creator (reduced from 6000)
        [5750000, 0]  // Alien Cube (reduced from 7000)
    ],
    teleportRocks: [
        [5040004, 0]  // Hyper Teleport Rock (3 days) (reduced from 10000)
    ]
};

var status = 0;
var currentCategory = "";
var selectedItem = -1;
var purchaseQuantity = 0;

function start() {
    var text = "Welcome to Kerning Market#k#b\r\n";
    text += "How can I help you today, #h  #?\r\n"
    text += "You currently have #r" + formatNumber(cm.getPlayer().getCSPoints(4)) + " NX#k.\r\n\r\n";
    text += "Please select a category:\r\n";
    text += "#L0#Cubes#l\r\n";
    text += "#L1#Cube Packs (10x)#l\r\n";
    text += "#L2#Potential#l\r\n";
    text += "#L3#Enhance#l\r\n";
    text += "#L4#Magnifying Glass#l\r\n";
    text += "#L5#Nebulite#l\r\n";
    text += "#L6##rHyper Teleport Rock (3 Days)#k#l\r\n";

    cm.sendSimple(text);
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }

    if (status == 0) {
        var category;
        switch(selection) {
            case 0:
                category = "cubes";
                break;
            case 1:
                category = "cubePacks";
                break;
            case 2:
                category = "potential";
                break;
            case 3:
                category = "enhance";
                break;
            case 4:
                category = "magnifyingGlass";
                break;
            case 5:
                category = "nebulite";
                break;
            case 6:
                category = "teleportRocks";
                break;
            default:
                cm.dispose();
                return;
        }

        var items = categories[category];
        if (items.length == 0) {
            cm.sendOk("This category is currently empty.");
            cm.dispose();
            return;
        }

        if (category === "teleportRocks") {
            var nx = cm.getPlayer().getCSPoints(4);
            if (nx < items[0][1]) {
                cm.sendOk("You don't have enough NX. You need " + formatNumber(items[0][1]) + " NX.");
                cm.dispose();
                return;
            }

            if (cm.getPlayer().getItemQuantity(5040004, false) > 0) {
                cm.sendOk("You already have a Hyper Teleport Rock.");
                cm.dispose();
                return;
            }

            cm.getPlayer().modifyCSPoints(4, -items[0][1], true);
            var period = 3; // 3 days
            Packages.server.MapleInventoryManipulator.addById(cm.getPlayer().getClient(), 5040004, 1, "", null, period, "Purchased from Henesys Market");
            cm.sendOk("You have purchased #i" + items[0][0] + "# #z" + items[0][0] + "# (3 days) for " + formatNumber(items[0][1]) + " NX.");
            cm.dispose();
            return;
        }

        currentCategory = category;
        var text = "Select an item to purchase:\r\n";
        for (var i = 0; i < items.length; i++) {
            if (category === "cubePacks") {
                text += "#L" + i + "# #i" + items[i][0] + "# #z" + items[i][0] + "# Pack (10x) - " + formatNumber(items[i][1]) + " NX\r\n";
            } else {
                text += "#L" + i + "# #i" + items[i][0] + "# #z" + items[i][0] + "# - " + formatNumber(items[i][1]) + " NX\r\n";
            }
        }

        status = 1;
        cm.sendSimple(text);
    } else if (status == 1) {
        var items = categories[currentCategory];
        selectedItem = selection;

        if (currentCategory === "cubePacks") {
            purchaseQuantity = 10;
            status = 3;
            var totalCost = items[selection][1];
            var nx = cm.getPlayer().getCSPoints(4);

            var text = "#e#bPurchase Confirmation#k#n\r\n\r\n";
            text += "#i" + items[selectedItem][0] + "# #z" + items[selectedItem][0] + "# Pack (10x)\r\n";
            text += "Total cost: #r" + formatNumber(totalCost) + " NX#k\r\n";
            text += "Your NX balance: #r" + formatNumber(nx) + " NX#k\r\n\r\n";
            text += "Would you like to proceed with this purchase?";
            cm.sendYesNo(text);
            return;
        }

        var nx = cm.getPlayer().getCSPoints(4);
        var maxAffordable = Math.floor(nx / items[selection][1]);
        var maxQuantity = Math.min(maxAffordable, 1000);

        var text = "#e#bPurchase Quantity#k#n\r\n\r\n";
        text += "#i" + items[selection][0] + "# #z" + items[selection][0] + "#\r\n";
        text += "Price per item: #r" + formatNumber(items[selection][1]) + " NX#k\r\n";
        text += "Your NX balance: #r" + formatNumber(nx) + " NX#k\r\n";
        text += "Maximum you can afford: #r" + formatNumber(maxQuantity) + "#k\r\n\r\n";
        text += "How many would you like to purchase?";
        cm.sendGetNumber(text, 1, 1, maxQuantity);
        status = 2;
    } else if (status == 2) {
        var items = categories[currentCategory];
        purchaseQuantity = selection;
        var totalCost = items[selectedItem][1] * purchaseQuantity;

        var nx = cm.getPlayer().getCSPoints(4);
        if (nx < totalCost) {
            cm.sendOk("You don't have enough NX. You need " + formatNumber(totalCost) + " NX.");
            cm.dispose();
            return;
        }

        status = 3;
        var text = "#e#bPurchase Confirmation#k#n\r\n\r\n";
        text += "#i" + items[selectedItem][0] + "# #z" + items[selectedItem][0] + "#\r\n";
        text += "Quantity: #r" + formatNumber(purchaseQuantity) + "#k\r\n";
        text += "Price per item: #r" + formatNumber(items[selectedItem][1]) + " NX#k\r\n";
        text += "Total cost: #r" + formatNumber(totalCost) + " NX#k\r\n";
        text += "Your NX balance: #r" + formatNumber(nx) + " NX#k\r\n\r\n";
        text += "Would you like to proceed with this purchase?";
        cm.sendYesNo(text);
    } else if (status == 3) {
        if (selection == 0) { // No
            cm.sendOk("Purchase cancelled.");
            cm.dispose();
            return;
        }

        var items = categories[currentCategory];
        var totalCost = items[selectedItem][1] * (currentCategory === "cubePacks" ? 1 : purchaseQuantity);

        if (currentCategory === "teleportRocks") {
            if (cm.getPlayer().getItemQuantity(5040004, false) > 0) {
                cm.sendOk("You already have a Hyper Teleport Rock.");
                cm.dispose();
                return;
            }
            var period = 3; // 3 days
            cm.getPlayer().modifyCSPoints(4, -totalCost, true);
            Packages.server.MapleInventoryManipulator.addById(cm.getPlayer().getClient(), items[selectedItem][0], purchaseQuantity, "", null, period, "Purchased from Henesys Market");
            cm.sendOk("You have purchased " + purchaseQuantity + "x #i" + items[selectedItem][0] + "# #z" + items[selectedItem][0] + "# (3 days) for " + formatNumber(totalCost) + " NX.");
        } else {
            cm.getPlayer().modifyCSPoints(4, -totalCost, true);
            var quantity = currentCategory === "cubePacks" ? 10 : purchaseQuantity;
            Packages.server.MapleInventoryManipulator.addById(cm.getPlayer().getClient(), items[selectedItem][0], quantity, "", null, 0, "Purchased from Henesys Market");
            if (currentCategory === "cubePacks") {
                cm.sendOk("You have purchased a #i" + items[selectedItem][0] + "# #z" + items[selectedItem][0] + "# Pack (10x) for " + formatNumber(totalCost) + " NX.");
            } else {
                cm.sendOk("You have purchased " + formatNumber(purchaseQuantity) + "x #i" + items[selectedItem][0] + "# #z" + items[selectedItem][0] + "# for " + formatNumber(totalCost) + " NX.");
            }
        }
        cm.dispose();
    }
}