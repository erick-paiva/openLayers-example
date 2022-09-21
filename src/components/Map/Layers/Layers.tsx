import { Box } from "@chakra-ui/react";
import { memo, ReactNode } from "react";

type LayersProps = {
  children: ReactNode;
};

const Layers = ({ children }: LayersProps) => {
  return <Box>{children}</Box>;
};

export default memo(Layers);
