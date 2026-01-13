import javax.swing.*;
import javax.swing.border.*;
import java.awt.*;
import java.awt.event.*;

public class Main extends JFrame {
    private int intentos = 0;
    private JTextField txtUser;
    private JPasswordField txtPass;
    private JButton btnLogin;
    private JLabel lblIntentos;
    private JPanel panelPrincipal;

    public Main() {
        setTitle("KGD AUTHENTICATION SYSTEM");
        setSize(500, 650);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setResizable(false);
        
        // Panel principal con gradiente
        panelPrincipal = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                super.paintComponent(g);
                Graphics2D g2d = (Graphics2D) g;
                g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
                int w = getWidth(), h = getHeight();
                Color color1 = new Color(26, 35, 53);
                Color color2 = new Color(65, 25, 25);
                GradientPaint gp = new GradientPaint(0, 0, color1, 0, h, color2);
                g2d.setPaint(gp);
                g2d.fillRect(0, 0, w, h);
            }
        };
        panelPrincipal.setLayout(null);
        
        // Logo/Título
        JLabel lblTitulo = new JLabel("KGD", SwingConstants.CENTER);
        lblTitulo.setFont(new Font("Arial Black", Font.BOLD, 48));
        lblTitulo.setForeground(new Color(220, 53, 69));
        lblTitulo.setBounds(0, 40, 500, 60);
        panelPrincipal.add(lblTitulo);
        
        JLabel lblSubtitulo = new JLabel("ANTDRON2K25 SYSTEM", SwingConstants.CENTER);
        lblSubtitulo.setFont(new Font("Arial", Font.BOLD, 16));
        lblSubtitulo.setForeground(new Color(200, 200, 200));
        lblSubtitulo.setBounds(0, 105, 500, 25);
        panelPrincipal.add(lblSubtitulo);
        
        // Panel de login con borde y fondo
        JPanel panelLogin = new JPanel();
        panelLogin.setLayout(null);
        panelLogin.setBackground(new Color(40, 50, 70, 230));
        panelLogin.setBorder(BorderFactory.createCompoundBorder(
            new LineBorder(new Color(220, 53, 69), 2, true),
            new EmptyBorder(20, 30, 20, 30)
        ));
        panelLogin.setBounds(75, 160, 350, 350);
        
        // Icono de usuario
        JLabel lblIconoUser = new JLabel("👤", SwingConstants.CENTER);
        lblIconoUser.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 40));
        lblIconoUser.setBounds(0, 20, 350, 50);
        panelLogin.add(lblIconoUser);
        
        // Usuario
        JLabel lblUser = new JLabel("Usuario (Cédula):");
        lblUser.setFont(new Font("Arial", Font.BOLD, 13));
        lblUser.setForeground(Color.WHITE);
        lblUser.setBounds(30, 90, 290, 25);
        panelLogin.add(lblUser);
        
        txtUser = new JTextField();
        txtUser.setFont(new Font("Arial", Font.PLAIN, 14));
        txtUser.setBorder(BorderFactory.createCompoundBorder(
            new LineBorder(new Color(100, 100, 120), 1, true),
            new EmptyBorder(5, 10, 5, 10)
        ));
        txtUser.setBackground(new Color(50, 60, 80));
        txtUser.setForeground(Color.WHITE);
        txtUser.setCaretColor(Color.WHITE);
        txtUser.setBounds(30, 120, 290, 35);
        panelLogin.add(txtUser);
        
        // Contraseña
        JLabel lblPass = new JLabel("Contraseña:");
        lblPass.setFont(new Font("Arial", Font.BOLD, 13));
        lblPass.setForeground(Color.WHITE);
        lblPass.setBounds(30, 170, 290, 25);
        panelLogin.add(lblPass);
        
        txtPass = new JPasswordField();
        txtPass.setFont(new Font("Arial", Font.PLAIN, 14));
        txtPass.setBorder(BorderFactory.createCompoundBorder(
            new LineBorder(new Color(100, 100, 120), 1, true),
            new EmptyBorder(5, 10, 5, 10)
        ));
        txtPass.setBackground(new Color(50, 60, 80));
        txtPass.setForeground(Color.WHITE);
        txtPass.setCaretColor(Color.WHITE);
        txtPass.setBounds(30, 200, 290, 35);
        panelLogin.add(txtPass);
        
        // Botón de login
        btnLogin = new JButton("INICIAR SESIÓN");
        btnLogin.setFont(new Font("Arial", Font.BOLD, 15));
        btnLogin.setForeground(Color.BLACK);
        btnLogin.setBackground(new Color(255, 200, 200));
        btnLogin.setBorder(new LineBorder(new Color(220, 53, 69), 3, true));
        btnLogin.setFocusPainted(false);
        btnLogin.setCursor(new Cursor(Cursor.HAND_CURSOR));
        btnLogin.setBounds(30, 260, 290, 40);
        btnLogin.setOpaque(true);
        btnLogin.setBorderPainted(true);
        
        // Efecto hover
        btnLogin.addMouseListener(new MouseAdapter() {
            public void mouseEntered(MouseEvent e) {
                btnLogin.setBackground(new Color(255, 150, 150));
                btnLogin.setForeground(Color.BLACK);
            }
            public void mouseExited(MouseEvent e) {
                btnLogin.setBackground(new Color(255, 200, 200));
                btnLogin.setForeground(Color.BLACK);
            }
        });
        
        panelLogin.add(btnLogin);
        
        // Etiqueta de intentos
        lblIntentos = new JLabel("", SwingConstants.CENTER);
        lblIntentos.setFont(new Font("Arial", Font.BOLD, 12));
        lblIntentos.setForeground(new Color(255, 200, 100));
        lblIntentos.setBounds(30, 310, 290, 20);
        panelLogin.add(lblIntentos);
        
        panelPrincipal.add(panelLogin);
        
        // Info footer
        JLabel lblInfo = new JLabel("GRUPO 3 - PROYECTO ANTDRON2K25", SwingConstants.CENTER);
        lblInfo.setFont(new Font("Arial", Font.ITALIC, 11));
        lblInfo.setForeground(new Color(150, 150, 150));
        lblInfo.setBounds(0, 560, 500, 20);
        panelPrincipal.add(lblInfo);
        
        add(panelPrincipal);
        
        // Acción del botón
        ActionListener loginAction = e -> validarLogin();
        btnLogin.addActionListener(loginAction);
        txtPass.addActionListener(loginAction);
        
        // Focus inicial
        txtUser.requestFocus();
    }
    
    private void validarLogin() {
        String u = txtUser.getText().trim();
        String p = new String(txtPass.getPassword());
        
        // Validación: patmic o Cédulas del Grupo 3
        boolean acceso = (u.equals("patmic") && p.equals("123")) ||
                         (u.equals("1726346719") && p.equals("123")) ||
                         (u.equals("1728795459") && p.equals("123")) ||
                         (u.equals("2200223473") && p.equals("123")) ||
                         (u.equals("1724252901") && p.equals("123"));
        
        if (acceso) {
            // Efecto de transición
            btnLogin.setText("ACCESO CONCEDIDO ✓");
            btnLogin.setBackground(new Color(40, 167, 69));
            Timer timer = new Timer(800, ev -> {
                new AntCiberDronGUI().setVisible(true);
                this.dispose();
                
            });
            timer.setRepeats(false);
            timer.start();
        } else {
            intentos++;
            if (intentos >= 3) {
                btnLogin.setEnabled(false);
                lblIntentos.setText("⚠ SISTEMA BLOQUEADO");
                lblIntentos.setForeground(Color.RED);
                JOptionPane.showMessageDialog(this, 
                    "Acceso denegado. Sistema bloqueado.", 
                    "KGD - Seguridad", 
                    JOptionPane.ERROR_MESSAGE);
                System.exit(0);
            } else {
                lblIntentos.setText("⚠ Intento " + intentos + "/3 - Credenciales incorrectas");
                lblIntentos.setForeground(new Color(255, 100, 100));
                txtPass.setText("");
                txtUser.requestFocus();
                
                // Efecto de shake
                Point pos = panelPrincipal.getLocation();
                Timer timer = new Timer(50, null);
                final int[] count = {0};
                timer.addActionListener(ev -> {
                    if (count[0]++ < 10) {
                        panelPrincipal.setLocation(pos.x + (count[0] % 2 == 0 ? 5 : -5), pos.y);
                    } else {
                        panelPrincipal.setLocation(pos);
                        ((Timer)ev.getSource()).stop();
                    }
                });
                timer.start();
            }
        }
    }

    public static void main(String[] args) {
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        SwingUtilities.invokeLater(() -> new Main().setVisible(true));
    }
}