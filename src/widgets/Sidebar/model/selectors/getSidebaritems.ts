import AboutIcon from "shared/assets/icons/about-20-20.svg";
import MainIcon from "shared/assets/icons/main-20-20.svg";
import ProfileIcon from "shared/assets/icons/profile-20-20.svg";
import ArticleIcon from "shared/assets/icons/article-20-20.svg";
import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import { SidebarItemType } from "../types/sidebar";
import {
  getRouteAbout,
  getRouteMain,
  getRouteProfile,
  getRouteArticles,
} from "@/shared/const/router";



export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      text: "Main",
      Icon: MainIcon,
    },
    {
      path: getRouteAbout(),
      text: "About",
      Icon: AboutIcon,
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.id),
        text: "Profile",
        Icon: ProfileIcon,
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        text: "Article",
        Icon: ArticleIcon,
        authOnly: true,
      }
    );
  }
  return sidebarItemsList;
});