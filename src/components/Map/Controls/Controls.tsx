import { Box } from "@chakra-ui/react";
import { memo, ReactNode } from "react";

type ControlsProps = {
  children: ReactNode;
};

const Controls = ({ children }: ControlsProps) => {
  return <Box>{children}</Box>;
};

export default memo(Controls);
