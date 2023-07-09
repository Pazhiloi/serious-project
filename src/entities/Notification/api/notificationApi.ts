import { rtkApi } from "@/shared/api/rtkApi";
import { Notification } from "../types/notification";

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotification: build.query<Notification[], null>({
      query: () => ({
        url: "/notifications",
      }),
    }),
  }),
});

export const useNotification = notificationApi.useGetNotificationQuery;
