"use server";

import { redirect } from "next/navigation";

export const openCategoryFilter = async (key, value, pathname = '', searchParams) => {
  if (key && value) {
    const params = new URLSearchParams(searchParams);
    params.set("filters", JSON.stringify({ [key]: value }));
    await navigate(`${pathname}?${params.toString()}`);
    
  }
};


export const navigate = async (relativePath) => {
  redirect(relativePath);
};

// export {navigate, openCategoryFilter };
