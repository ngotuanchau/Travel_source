export interface tourStatus {
  id: number;
  name: string;
  color: string;
}
export const lstTourStatus: tourStatus[] = [
  {
    id: 1,
    name: "Mới tạo",
    color: "color:black",
  },
  {
    id: 2,
    name: "Đang chuẩn bị",
    color: "color:green",
  },
  {
    id: 3,
    name: "Đang khởi hành",
    color: "color:blue",
  },
  {
    id: 4,
    name: "Đã kết thúc",
    color: "color:gray",
  },
  {
    id: 5,
    name: "Bị hủy",
    color: "color:red",
  },
];
