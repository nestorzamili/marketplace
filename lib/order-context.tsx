'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface OrderItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface Order {
  id: string;
  orderId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  adminFee: number;
  codFee: number;
  total: number;
  paymentMethod: string;
  shippingMethod: string;
  status:
    | 'pending'
    | 'paid'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';
  createdAt: string;
  paymentProof?: string;
  trackingNumber?: string;
  bankAccount?: {
    bank: string;
    accountNumber: string;
    accountName: string;
  };
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
}

type OrderAction =
  | { type: 'CREATE_ORDER'; payload: Order }
  | {
      type: 'UPDATE_ORDER_STATUS';
      payload: { orderId: string; status: Order['status'] };
    }
  | {
      type: 'ADD_PAYMENT_PROOF';
      payload: { orderId: string; paymentProof: string };
    }
  | {
      type: 'ADD_TRACKING_NUMBER';
      payload: { orderId: string; trackingNumber: string };
    }
  | { type: 'SET_CURRENT_ORDER'; payload: Order | null }
  | { type: 'LOAD_ORDERS'; payload: Order[] }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
};

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'CREATE_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        currentOrder: action.payload,
      };

    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderId === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order,
        ),
        currentOrder:
          state.currentOrder?.orderId === action.payload.orderId
            ? { ...state.currentOrder, status: action.payload.status }
            : state.currentOrder,
      };

    case 'ADD_PAYMENT_PROOF':
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderId === action.payload.orderId
            ? {
                ...order,
                paymentProof: action.payload.paymentProof,
                status: 'paid',
              }
            : order,
        ),
        currentOrder:
          state.currentOrder?.orderId === action.payload.orderId
            ? {
                ...state.currentOrder,
                paymentProof: action.payload.paymentProof,
                status: 'paid',
              }
            : state.currentOrder,
      };

    case 'ADD_TRACKING_NUMBER':
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderId === action.payload.orderId
            ? {
                ...order,
                trackingNumber: action.payload.trackingNumber,
                status: 'shipped',
              }
            : order,
        ),
        currentOrder:
          state.currentOrder?.orderId === action.payload.orderId
            ? {
                ...state.currentOrder,
                trackingNumber: action.payload.trackingNumber,
                status: 'shipped',
              }
            : state.currentOrder,
      };

    case 'SET_CURRENT_ORDER':
      return {
        ...state,
        currentOrder: action.payload,
      };

    case 'LOAD_ORDERS':
      return {
        ...state,
        orders: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

interface OrderContextType {
  state: OrderState;
  createOrder: (order: Omit<Order, 'id'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addPaymentProof: (orderId: string, paymentProof: string) => void;
  addTrackingNumber: (orderId: string, trackingNumber: string) => void;
  setCurrentOrder: (order: Order | null) => void;
  loadOrders: () => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const createOrder = (orderData: Omit<Order, 'id'>) => {
    const order: Order = {
      ...orderData,
      id: Math.random().toString(36).substring(7),
    };

    // Save to localStorage
    const existingOrders = getStoredOrders();
    const updatedOrders = [order, ...existingOrders];
    localStorage.setItem('user_orders', JSON.stringify(updatedOrders));

    dispatch({ type: 'CREATE_ORDER', payload: order });
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    // Update localStorage
    const existingOrders = getStoredOrders();
    const updatedOrders = existingOrders.map((order) =>
      order.orderId === orderId ? { ...order, status } : order,
    );
    localStorage.setItem('user_orders', JSON.stringify(updatedOrders));

    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status } });
  };

  const addPaymentProof = (orderId: string, paymentProof: string) => {
    // Update localStorage
    const existingOrders = getStoredOrders();
    const updatedOrders = existingOrders.map((order) =>
      order.orderId === orderId
        ? { ...order, paymentProof, status: 'paid' as const }
        : order,
    );
    localStorage.setItem('user_orders', JSON.stringify(updatedOrders));

    dispatch({ type: 'ADD_PAYMENT_PROOF', payload: { orderId, paymentProof } });
  };

  const addTrackingNumber = (orderId: string, trackingNumber: string) => {
    // Update localStorage
    const existingOrders = getStoredOrders();
    const updatedOrders = existingOrders.map((order) =>
      order.orderId === orderId
        ? { ...order, trackingNumber, status: 'shipped' as const }
        : order,
    );
    localStorage.setItem('user_orders', JSON.stringify(updatedOrders));

    dispatch({
      type: 'ADD_TRACKING_NUMBER',
      payload: { orderId, trackingNumber },
    });
  };

  const setCurrentOrder = (order: Order | null) => {
    dispatch({ type: 'SET_CURRENT_ORDER', payload: order });
  };

  const loadOrders = () => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const orders = getStoredOrders();
      dispatch({ type: 'LOAD_ORDERS', payload: orders });
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getStoredOrders = (): Order[] => {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem('user_orders');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return state.orders.find((order) => order.orderId === orderId);
  };

  const getOrdersByStatus = (status: Order['status']): Order[] => {
    return state.orders.filter((order) => order.status === status);
  };

  return (
    <OrderContext.Provider
      value={{
        state,
        createOrder,
        updateOrderStatus,
        addPaymentProof,
        addTrackingNumber,
        setCurrentOrder,
        loadOrders,
        getOrderById,
        getOrdersByStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
