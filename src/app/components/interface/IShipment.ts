export interface IShipment {
  id?: string;
  shipmentId: string;
  shipmentOrigin: string;
  shipmentDestination: string;
  shipmentStatus: string;
  estimatedDeliverydate: string;
  userId: string;
  driverDetails: IDriverDetail;
  trackingDetails: ITrackingDetail;
  createdOn: string;
  updatedOn: string;
}

export interface IDriverDetail {
  driverId: string;
  assignedAt: string;
}

export interface ITrackingDetail {
  lattitude: string;
  longitude: string;
  timeStamp: string;
}
