import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const WriteNowValidationSchema = yup.object({
  destinationName: yup.string().required('Preencha o nome comples'),
  destinationAddress: yup.string().email().required('Insira um e-mail valido'),
  dueDate: yup.string().required('Preemcha a data'),
  subject: yup.string().required('Preencha o assunto'),
  body: yup.string().required('Preencha o conteúdo'),
});

export const WriteNowResolver = yupResolver(WriteNowValidationSchema);
