import { Message, useToaster } from 'rsuite';

const useToast = () => {
  const toaster = useToaster();

  // type should be info,success,warning,error

  const showToast = (type, msg) => {
    toaster.push(
        <Message showIcon type={type} closable>
        {msg}
      </Message>,
      { placement: 'topEnd', duration: 2000 }
    );
  };

  return showToast;
};

export default useToast;
