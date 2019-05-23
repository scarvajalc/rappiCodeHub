const Order = require("../models/order");
const RappiTendero = require("../models/rappitendero");
const OrderProduct = require("../models/ordersproduct");
const CartProduct = require("../models/cartProducts");
const BranchRepo = require("../repository/branch");
const repository = require("../repository/index");
const branchRepository = require("../repository/branch");
const orderFunctions = require("../functions/order");

//const CartRepository = require("../repository/car");

const orderRepository = {
  async startOrderProcess(userId, addressId) {
    storeOpenResponse = await BranchRepo.checkStoreTime(userId);
    checkedCartProductsResponse = await BranchRepo.checkCartProducts(userId);
    orderBranchId = await BranchRepo.getCartBranchId(userId);
    if (
      storeOpenResponse.isOpen &&
      checkedCartProductsResponse.allProductsAvailable
    ) {
      orderRappiTendero = await orderRepository.rappiTenderoGetClosest(
        orderBranchId
      );
      //calcular total
      orderTotal = await orderRepository.getOrderTotalPrice(userId);
      await orderRepository.createOrder(
        userId,
        addressId,
        orderBranchId,
        orderRappiTendero.id,
        orderTotal
      );
      return { orderCreated: true };
    } else {
      return { orderCreated: false };
      //errores
    }
  },

  async createOrder(userId, addressId, branchId, rappiTenderoId, Ordertotal) {
    let order_data = {
      client_id: userId,
      client_address_id: addressId,
      rt_id: rappiTenderoId,
      branch_id: branchId,
      total: Ordertotal,
      status: 1
    };
    order = await Order.create(order_data);
    await orderRepository.cleanAndCopyCartToOrder(userId, order.id);
    await orderRepository.changeRappiTenderoInOrderStatus(rappiTenderoId, true);
  },

  async cleanAndCopyCartToOrder(userId, orderId) {
    const cartResponse = await repository.getClientCart(userId);
    const cartId = cartResponse[0].id;
    const cartProducts = cartResponse[0].cartproducts;
    for (let i = 0; i < cartProducts.length; i++) {
      cartProductInfo = cartProducts[i];
      let orderProductData = {
        order_id: orderId,
        product_id: cartProductInfo.product_id,
        quantity: cartProductInfo.quantity
      };
      await OrderProduct.create(orderProductData);
    }
    await CartProduct.destroy({
      where: {
        cart_id: cartId
      }
    });
  },

  async changeRappiTenderoInOrderStatus(rappiTenderoId, status) {
    RappiTendero.update(
      { in_order: status },
      { where: { id: rappiTenderoId } }
    );
  },

  async rappiTenderoGetClosest(branchId) {
    const restaurantCoordinates = await branchRepository.getBranchCoordinates(
      branchId
    );
    const availableRappiTenderos = await repository.getAllAvailableRappiT();

    const closestRappiTendero = orderFunctions.getClosestRappiT(
      restaurantCoordinates,
      availableRappiTenderos
    );

    const assignedRappiTendero = await repository.getAssignedRappiTendero(
      closestRappiTendero[0].rappiTenderoId
    );

    return assignedRappiTendero[0];
  },

  async getOrderTotalPrice(userId) {
    const deliveryFee = 4500;
    let total = 0;
    const cartResponse = await repository.getClientCart(userId);
    const cartProducts = cartResponse[0].cartproducts;
    for (let i = 0; i < cartProducts.length; i++) {
      total += cartProducts[i].product.price;
    }
    return total + deliveryFee;
  },

  async userHaveOrderInProgress(userId) {
    userOrders = await Order.findAll({
      where: {
        client_id: userId
      }
    });
    if (userOrders.length > 0) {
      return true;
    }
    return false;
  },

  async getOrderData(userId) {
    order = await Order.findAll({
      where: {
        client_id: userId
      }
    });

    order = order[0];
    client = await order.getClient();
    store = await order.getBranch();
    rt = await order.getRappitendero();
    products = await order.getProducts();
    orderData = {
      rtName: rt.first_name + " " + rt.last_name,
      clientName: client.first_name + " " + client.last_name,
      storeName: store.name,
      total: order.total,
      products: products
    };
    return orderData;
  }
};

module.exports = orderRepository;
