import { OrderAdminChangeStatusDto, PlaceOrderDto } from "@/data/dto";
import { Category, Invoice, InvoiceDetails, Medicine, Order, OrderDeliver, OrderDetails } from "@/data/interfaces";
import { Paginated, SRO } from "@/data/sro";
import { apiGet, apiPost } from "../api";

export const StoreAPI = {
  async CategoryRoot() {
    const res = await apiGet<SRO<Category[]>>("v1/store/categories");
    return res.data.data;
  },

  async PopularMedicine() {
    const res = await apiGet<SRO<Medicine[]>>("v1/store/popular-medicine");
    return res.data.data;
  },

  async MedicinesRoot(
    page: number = 1, 
    perPage: number = 20,
    filters?: {
      search?: string;
      category?: string;
      minPrice?: number;
      maxPrice?: number;
      minRating?: number;
      status?: "IN-STOCK" | "OUT-OF-STOCK" | "LOW-STOCK";
      sortBy?: string;
    }
  ) {
    let url = `v1/store/medicines?page=${page}&per_page=${perPage}`;
    
    // Add filter parameters if they exist
    if (filters) {
      if (filters.search) {
        url += `&search=${encodeURIComponent(filters.search)}`;
      }
      
      if (filters.category) {
        url += `&category_slug=${encodeURIComponent(filters.category)}`;
      }
      
      if (filters.minPrice) {
        url += `&min_price=${filters.minPrice}`;
      }
      
      if (filters.maxPrice) {
        url += `&max_price=${filters.maxPrice}`;
      }
      
      if (filters.minRating) {
        url += `&min_rating=${filters.minRating}`;
      }
      
      if (filters.status) {
        url += `&status=${filters.status}`;
      }
      
      if (filters.sortBy) {
        // Convert frontend sort values to backend sort_by parameter
        let backendSortBy = "newest"; // default
        switch (filters.sortBy) {
          case 'price-asc':
            backendSortBy = 'price_asc';
            break;
          case 'price-desc':
            backendSortBy = 'price_desc';
            break;
          case 'rating':
            backendSortBy = 'rating_desc';
            break;
          case 'name-asc':
            backendSortBy = 'name_asc';
            break;
          case 'name-desc':
            backendSortBy = 'name_desc';
            break;
          case 'newest':
            backendSortBy = 'newest';
            break;
          case 'oldest':
            backendSortBy = 'oldest';
            break;
          case 'relevance':
          default:
            backendSortBy = 'newest';
            break;
        }
        url += `&sort_by=${backendSortBy}`;
      }
    }
    
    const res = await apiGet<SRO<Paginated<Medicine>>>(url);
    return res.data.data;
  },

  async MedicineDetails(id: string) {
    const res = await apiGet<SRO<Medicine>>(`v1/store/medicines/${id}/details`);
    return res.data.data;
  },

  async CategoriesRoot() {
    const res = await apiGet<SRO<Category[]>>("v1/store/categories");
    return res.data.data;
  },

  async OrdersUserList() {
    const res = await apiGet<SRO<Order[]>>("v1/store/orders");
    console.log("API Response:", res);
    return res.data.data;
  },

  async OrderDetails(id: string) {
    const res = await apiGet<SRO<OrderDetails>>(`v1/store/orders/${id}/details`);
    return res.data.data;
  },

  async PlaceOrder(data: PlaceOrderDto) {
    const res = await apiPost<PlaceOrderDto, SRO<Order>>("v1/store/orders/add", data);
    return res.data.data;
  },

  async OrderDeliverList() {
    const res = await apiGet<SRO<OrderDeliver[]>>("v1/store/deliver/orders");
    return res.data.data;
  },
  
  async UpdateOrderStatus(orderId: string, status: OrderAdminChangeStatusDto) {
    const res = await apiPost<OrderAdminChangeStatusDto, SRO<Order>>(`v1/store/deliver/orders/${orderId}/update-status`, status);
    return res.data.data;
  },

  async InvoiceList() {
    const res = await apiGet<SRO<Invoice[]>>('v1/store/invoices/list');
    return res.data.data;
  },

  async InvoiceDetails(id: string) {
    const res = await apiGet<SRO<InvoiceDetails>>(`v1/store/invoices/${id}/details`);
    return res.data.data;
  }
  
};
