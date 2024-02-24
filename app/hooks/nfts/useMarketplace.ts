import { useEffect } from "react";
import { useFindMarketplace } from "./useFindMarketplace";
import { useCreateMarketplace } from ".";

export type UseMarketplaceProps = {
  network: string;
};

export const useMarketplace = ({ network }: UseMarketplaceProps) => {
  const { data, status: findStatus } = useFindMarketplace({ network });
  const { create, status: createStatus } = useCreateMarketplace({ network })
  
  useEffect(() => {
    if (findStatus === 'success' && !data && createStatus === 'idle') {
      console.log('CREATREEEEEEE')
      //create()
    }
  }, [findStatus, data, createStatus, create])
};