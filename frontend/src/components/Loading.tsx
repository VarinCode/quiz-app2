import { ReactElement, useContext, FC } from "react";
import { DataContext } from "./Quiz";
import { DefaultValue as Context, LoadingBlockProps } from "../model/model";
import { Blocks } from "react-loader-spinner";

interface LoadingProps {
  text: string;
}

const Loading: FC<LoadingProps> = ({ text }): ReactElement => {
  const context: Context = useContext<Context>(DataContext);

  return (
    <div className="absolute right-2/4 top-32 translate-x-2/4">
      <div
        className={`flex flex-col items-center w-max mx-auto pointer-events-none`}
      >
        <Blocks {...LoadingBlockProps} visible={context.loading} />
        <p
          className={`text-center font-mali font-thin text-lg text-black`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default Loading;
