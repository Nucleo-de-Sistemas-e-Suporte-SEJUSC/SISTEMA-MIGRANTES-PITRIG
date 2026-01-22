import React, { useState } from 'react';
import '../css/LoginScreen.css'; // Importando o CSS separado

export function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (email === 'admin' && password === '123') {
            alert('Login bem-sucedido! Redirecionando...');
        } else {
            setError('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-logo">PITRIG</h1>

                <p className="login-subtitle">
                    Acesse sua conta para continuar
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">E-mail ou Usuário</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu.email@exemplo.com"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Entrar
                    </button>
                </form>

                {error && <p className="login-error">{error}</p>}

                <p className="login-footer">
                    Plataforma Integrada para gestão e atendimento
                </p>
            </div>
        </div>
    );
}
