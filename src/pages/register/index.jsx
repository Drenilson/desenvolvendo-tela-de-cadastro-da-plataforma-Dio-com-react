import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { P, Paragraph, Container, Title, Section, Column, TitleRegister, SubtitleRegister, Wrapper, FazerLogin } from './styles';

const Register = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.post('/users', formData);
            if (data.id) {
                navigate('/feed');
                return;
            }
            alert('Erro ao cadastrar usuário');
        } catch (e) {
            alert('Houve um erro ao cadastrar. Tente novamente.');
            console.error(e);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>A plataforma para você aprender com experts, dominar as principais tecnologias 
                        e entrar mais rápido nas empresas mais desejadas.</Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleRegister>Comece agora grátis</TitleRegister>
                        <SubtitleRegister>Faça seu login e make the change._</SubtitleRegister>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input 
                                placeholder="Nome completo" 
                                leftIcon={<MdPerson />} 
                                name="name" 
                                control={control} 
                                rules={{ required: 'Nome completo é obrigatório' }} 
                            />
                            {errors.name && <span>{errors.name.message}</span>}
                            
                            <Input 
                                placeholder="E-mail" 
                                leftIcon={<MdEmail />} 
                                name="email" 
                                control={control} 
                                rules={{ required: 'E-mail é obrigatório' }} 
                            />
                            {errors.email && <span>{errors.email.message}</span>}
                            
                            <Input 
                                type="password" 
                                placeholder="Senha" 
                                leftIcon={<MdLock />} 
                                name="senha" 
                                control={control} 
                                rules={{ required: 'Senha é obrigatória' }} 
                            />
                            {errors.senha && <span>{errors.senha.message}</span>}
                            
                            <Button title="Cadastrar" variant="secondary" type="submit"/>
                        </form>
                        
                        <Section>
                            <P>Ao clicar em "criar minha conta grátis", declaro que 
                            aceito as Políticas de Privacidade e os Termos de Uso da DIO.</P>
                        </Section>

                        <div>
                            <Paragraph>
                                Já tenho uma conta.
                                <FazerLogin onClick={() => navigate('/login')}> Fazer login</FazerLogin>
                            </Paragraph>
                        </div>

                    </Wrapper>
                </Column>
            </Container>
        </>
    );
}

export { Register };
