import javax.swing.*;
import javax.swing.border.*;
import javax.swing.table.*;
import java.awt.*;
import java.awt.event.*;
import java.io.*;
import java.util.*;

// ==================== MODELOS DE DATOS ====================

class CoordenadasUcranianas {
    String geoposicion;
    String lunes, martes, miercoles, jueves, viernes;
    String tipoArsenal;
    
    public CoordenadasUcranianas(String[] datos) {
        this.geoposicion = datos[0];
        this.lunes = datos[1];
        this.martes = datos[2];
        this.miercoles = datos[3];
        this.jueves = datos[4];
        this.viernes = datos[5];
        this.tipoArsenal = datos[6];
    }
}

// ==================== JERARQUÍA DE HORMIGAS ====================

abstract class Hormiga {
    protected String tipo = "HLarva";
    protected String alimento;
    protected boolean viva = true;
    
    public String getTipo() { return tipo; }
    public abstract void comer(String comida);
    public boolean estaViva() { return viva; }
}

class HLarva extends Hormiga {
    public HLarva() {
        this.tipo = "HLarva";
        this.alimento = "Néctar";
    }
    
    public void comer(String comida) {
        if (comida.equals("Néctar")) {
            viva = true;
        }
    }
}

class HSoldado extends Hormiga {
    public HSoldado() {
        this.tipo = "HSoldado";
        this.alimento = "Carnívoro";
    }
    
    public void comer(String comida) {
        viva = comida.equals("Carnívoro");
    }
}

class HZangano extends Hormiga {
    public HZangano() {
        this.tipo = "HZangano";
        this.alimento = "Omnívoro";
    }
    
    public void comer(String comida) {
        viva = comida.equals("Omnívoro");
    }
}

class HRastreadora extends Hormiga {
    public HRastreadora() {
        this.tipo = "HRastreadora";
        this.alimento = "Herbívoro";
    }
    
    public void comer(String comida) {
        viva = comida.equals("Herbívoro");
    }
}

// ==================== BOMBA BBA (AUTÓMATA) ====================

class BBA {
    // Autómata para reconocer L = { abcdt+, ab* }
    // abcdt+ : abcd seguido de una o más 't'
    // ab*    : a seguido de cero o más 'b'
    
    public boolean evaluarArsenal(String w) {
        if (w == null || w.isEmpty()) return false;
        return reconocerAbcdtMas(w) || reconocerAbEstrella(w);
    }
    
    private boolean reconocerAbcdtMas(String w) {
        // Reconoce abcdt+
        if (w.length() < 5) return false;
        if (!w.startsWith("abcd")) return false;
        
        for (int i = 4; i < w.length(); i++) {
            if (w.charAt(i) != 't') return false;
        }
        return true;
    }
    
    private boolean reconocerAbEstrella(String w) {
        // Reconoce ab*
        if (w.length() < 1) return false;
        if (w.charAt(0) != 'a') return false;
        
        for (int i = 1; i < w.length(); i++) {
            if (w.charAt(i) != 'b') return false;
        }
        return true;
    }
    
    public String getGrafoAutomata() {
        return "AUTÓMATA FINITO DETERMINISTA (AFD)\n" +
               "Estados: {q0, q1, q2, q3, q4, q5, qf, qe}\n" +
               "Alfabeto: {a, b, c, d, t}\n" +
               "Estado inicial: q0\n" +
               "Estados finales: {qf}\n\n" +
               "TRANSICIONES para abcdt+:\n" +
               "δ(q0, a) = q1\n" +
               "δ(q1, b) = q2\n" +
               "δ(q2, c) = q3\n" +
               "δ(q3, d) = q4\n" +
               "δ(q4, t) = q5\n" +
               "δ(q5, t) = q5 (loop)\n" +
               "q5 es final\n\n" +
               "TRANSICIONES para ab*:\n" +
               "δ(q0, a) = qf (ya es final)\n" +
               "δ(qf, b) = qf (loop)\n";
    }
}

// ==================== ANTCIBERDRON ====================

class AntCiberDron {
    private Hormiga hormiga;
    private BBA bba;
    private String metralleta = "M4A1";
    private String laser = "LaserX-5000";
    private int energiaFuente = 100;
    private boolean turboReactorActivo = false;
    
    public AntCiberDron(Hormiga hormiga) {
        this.hormiga = hormiga;
        this.bba = new BBA();
    }
    
    public boolean procesarArsenal(String arsenal) {
        return bba.evaluarArsenal(arsenal);
    }
    
    public void volar() {
        if (energiaFuente >= 20) {
            turboReactorActivo = true;
            energiaFuente -= 20;
        }
    }
    
    public void dispararMetralleta() {
        if (energiaFuente >= 5) {
            energiaFuente -= 5;
        }
    }
    
    public void dispararLaser() {
        if (energiaFuente >= 15) {
            energiaFuente -= 15;
        }
    }
    
    public void recargarEnergia() {
        energiaFuente = 100;
    }
    
    public int getEnergia() { return energiaFuente; }
    public Hormiga getHormiga() { return hormiga; }
    public String getGrafoAutomata() { return bba.getGrafoAutomata(); }
}

// ==================== INTERFAZ GRÁFICA PRINCIPAL ====================

class AntCiberDronGUI extends JFrame {
    private JTextArea consola;
    private JProgressBar barraProgreso;
    private JLabel lblEstado;
    private ArrayList<CoordenadasUcranianas> coordenadas;
    private AntCiberDron dron;
    private DefaultTableModel modeloTabla;
    
    public AntCiberDronGUI() {
        setTitle("KGD - CONTROL ANTDRON2K25 - GRUPO 3");
        setSize(1000, 700);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout(10, 10));
        
        // IMPORTANTE: Inicializar dron PRIMERO antes de crear los tabs
        dron = new AntCiberDron(new HZangano());
        
        // Panel superior con información del equipo
        JPanel panelSuperior = crearPanelEquipo();
        add(panelSuperior, BorderLayout.NORTH);
        
        // Panel central con tabs
        JTabbedPane tabs = new JTabbedPane();
        tabs.setFont(new Font("Arial", Font.BOLD, 12));
        
        // Tab 1: Misión Principal
        JPanel tabMision = crearTabMision();
        tabs.addTab("🎯 MISIÓN", tabMision);
        
        // Tab 2: Autómata
        JPanel tabAutomata = crearTabAutomata();
        tabs.addTab("🤖 AUTÓMATA BBA", tabAutomata);
        
        // Tab 3: Hormiguero
        JPanel tabHormiguero = crearTabHormiguero();
        tabs.addTab("🐜 HORMIGUERO", tabHormiguero);
        
        add(tabs, BorderLayout.CENTER);
        
        // Cargar coordenadas
        cargarCoordenadas();
    }
    
    private JPanel crearPanelEquipo() {
        JPanel panel = new JPanel();
        panel.setLayout(new BorderLayout());
        panel.setBackground(new Color(40, 50, 70));
        panel.setBorder(new EmptyBorder(15, 15, 15, 15));
        
        JLabel lblTitulo = new JLabel("PROYECTO ANTDRON2K25 - KGD RUSIA");
        lblTitulo.setFont(new Font("Arial Black", Font.BOLD, 18));
        lblTitulo.setForeground(new Color(220, 53, 69));
        lblTitulo.setHorizontalAlignment(SwingConstants.CENTER);
        
        JTextArea txtEquipo = new JTextArea();
        txtEquipo.setEditable(false);
        txtEquipo.setBackground(new Color(30, 40, 60));
        txtEquipo.setForeground(Color.WHITE);
        txtEquipo.setFont(new Font("Consolas", Font.PLAIN, 12));
        txtEquipo.setText(
            "[+] TEAM [3]: Grupo 3\n" +
            "• Alumno 1: 1726346719 | Anthony\n" +
            "• Alumno 2: 1728795459 | Ricardo\n" +
            "• Alumno 3: 2200223473 | Julio\n" +
            "• Alumno 4: 1724252901 | Cristian\n" +
            "• Profesor: patmic | Patricio Paccha"
        );
        
        panel.add(lblTitulo, BorderLayout.NORTH);
        panel.add(txtEquipo, BorderLayout.CENTER);
        
        return panel;
    }
    
    private JPanel crearTabMision() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(new EmptyBorder(10, 10, 10, 10));
        
        // Tabla de coordenadas
        String[] columnas = {"Geoposición", "Lunes", "Martes", "Miércoles", 
                            "Jueves", "Viernes", "Tipo Arsenal", "Estado"};
        modeloTabla = new DefaultTableModel(columnas, 0) {
            public boolean isCellEditable(int row, int col) { return false; }
        };
        JTable tabla = new JTable(modeloTabla);
        tabla.setFont(new Font("Consolas", Font.PLAIN, 11));
        tabla.setRowHeight(25);
        JScrollPane scrollTabla = new JScrollPane(tabla);
        
        // Consola de operaciones
        consola = new JTextArea();
        consola.setEditable(false);
        consola.setBackground(Color.BLACK);
        consola.setForeground(Color.GREEN);
        consola.setFont(new Font("Consolas", Font.PLAIN, 12));
        JScrollPane scrollConsola = new JScrollPane(consola);
        scrollConsola.setPreferredSize(new Dimension(0, 150));
        
        // Panel de control
        JPanel panelControl = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 10));
        
        JButton btnEjecutar = new JButton("▶ EJECUTAR MISIÓN");
        btnEjecutar.setFont(new Font("Arial", Font.BOLD, 15));
        btnEjecutar.setBackground(new Color(255, 200, 200));
        btnEjecutar.setForeground(Color.BLACK);
        btnEjecutar.setFocusPainted(false);
        btnEjecutar.setCursor(new Cursor(Cursor.HAND_CURSOR));
        btnEjecutar.setOpaque(true);
        btnEjecutar.setBorderPainted(true);
        btnEjecutar.setBorder(BorderFactory.createLineBorder(new Color(220, 53, 69), 3));
        btnEjecutar.setPreferredSize(new Dimension(200, 35));
        
        // Efecto hover para el botón
        btnEjecutar.addMouseListener(new MouseAdapter() {
            public void mouseEntered(MouseEvent e) {
                btnEjecutar.setBackground(new Color(255, 150, 150));
            }
            public void mouseExited(MouseEvent e) {
                btnEjecutar.setBackground(new Color(255, 200, 200));
            }
        });
        
        barraProgreso = new JProgressBar(0, 100);
        barraProgreso.setStringPainted(true);
        barraProgreso.setPreferredSize(new Dimension(300, 25));
        
        lblEstado = new JLabel("Sistema listo");
        lblEstado.setFont(new Font("Arial", Font.BOLD, 12));
        
        panelControl.add(btnEjecutar);
        panelControl.add(barraProgreso);
        panelControl.add(lblEstado);
        
        btnEjecutar.addActionListener(e -> ejecutarMision());
        
        // Organizar componentes
        JSplitPane split = new JSplitPane(JSplitPane.VERTICAL_SPLIT, 
                                         scrollTabla, scrollConsola);
        split.setDividerLocation(250);
        
        panel.add(split, BorderLayout.CENTER);
        panel.add(panelControl, BorderLayout.SOUTH);
        
        return panel;
    }
    
    private JPanel crearTabAutomata() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(new EmptyBorder(10, 10, 10, 10));
        
        JTextArea txtAutomata = new JTextArea();
        txtAutomata.setEditable(false);
        txtAutomata.setFont(new Font("Consolas", Font.PLAIN, 12));
        txtAutomata.setText(dron.getGrafoAutomata());
        
        JPanel panelTest = new JPanel(new FlowLayout());
        JTextField txtTest = new JTextField(20);
        JButton btnTest = new JButton("Probar Arsenal");
        JLabel lblResultado = new JLabel("Resultado: ");
        
        btnTest.addActionListener(e -> {
            String arsenal = txtTest.getText();
            boolean resultado = dron.procesarArsenal(arsenal);
            lblResultado.setText("Resultado: " + (resultado ? "✓ EXPLOTAR" : "✗ NO EXPLOTAR"));
            lblResultado.setForeground(resultado ? Color.GREEN : Color.RED);
        });
        
        panelTest.add(new JLabel("Arsenal:"));
        panelTest.add(txtTest);
        panelTest.add(btnTest);
        panelTest.add(lblResultado);
        
        panel.add(new JScrollPane(txtAutomata), BorderLayout.CENTER);
        panel.add(panelTest, BorderLayout.SOUTH);
        
        return panel;
    }
    
    private JPanel crearTabHormiguero() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(new EmptyBorder(10, 10, 10, 10));
        
        JTextArea txtInfo = new JTextArea();
        txtInfo.setEditable(false);
        txtInfo.setFont(new Font("Consolas", Font.PLAIN, 12));
        txtInfo.setText(
            "═══════════════════════════════════════════════════\n" +
            "           HORMIGUERO VIRTUAL - GRUPO 3\n" +
            "═══════════════════════════════════════════════════\n\n" +
            "TIPOS DE HORMIGAS:\n\n" +
            "• HLarva (Todas)\n" +
            "  - Alimento: Néctar\n" +
            "  - Estado: Fase inicial\n\n" +
            "• HZángano (Grupo 3-4)\n" +
            "  - Alimento: Omnívoro\n" +
            "  - Características: Versátil en combate\n\n" +
            "ESTADO DEL DRON ACTUAL:\n" +
            "• Tipo: " + dron.getHormiga().getTipo() + "\n" +
            "• Energía: " + dron.getEnergia() + "%\n" +
            "• Armamento: Metralleta M4A1 + Láser X-5000\n" +
            "• Turbo Reactor: Operativo\n" +
            "• Bomba BBA: Instalada y funcional\n"
        );
        
        panel.add(new JScrollPane(txtInfo), BorderLayout.CENTER);
        
        return panel;
    }
    
    private void cargarCoordenadas() {
        coordenadas = new ArrayList<>();
        
        // Crear archivo Grupo03.csv si no existe
        File archivo = new File("Grupo03.csv");
        if (!archivo.exists()) {
            crearArchivoCSV();
        }
        
        try (BufferedReader br = new BufferedReader(new FileReader(archivo))) {
            String linea;
            while ((linea = br.readLine()) != null) {
                String[] datos = linea.split(";");
                if (datos.length == 7) {
                    coordenadas.add(new CoordenadasUcranianas(datos));
                    modeloTabla.addRow(new Object[]{
                        datos[0], datos[1], datos[2], datos[3], 
                        datos[4], datos[5], datos[6], "Pendiente"
                    });
                }
            }
            consola.append("[INFO] Archivo Grupo03.csv cargado exitosamente\n");
            consola.append("[INFO] Total coordenadas: " + coordenadas.size() + "\n\n");
        } catch (IOException e) {
            consola.append("[ERROR] No se pudo cargar el archivo CSV\n");
            crearDatosPrueba();
        }
    }
    
    private void crearArchivoCSV() {
        try (PrintWriter pw = new PrintWriter("Grupo03.csv")) {
            pw.println("Coord-01;01-02;;;;;aaaa");
            pw.println("Coord-01;01-02;;;;;a");
            pw.println("Coord-00;;;;;; aa");
            pw.println("Coord-03;;;03-06;;;abc");
            pw.println("Coord-06;;;;04-08;;abcdttttt");
            pw.println("Coord-03;;;03-06;;;abc");
            pw.println("Coord-05;;;;;05-10;abcdttt");
            pw.println("Coord-09;01-02;;;;;ab");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    private void crearDatosPrueba() {
        coordenadas.clear();
        modeloTabla.setRowCount(0);
        
        String[][] datos = {
            {"Coord-05", "", "", "", "", "05-10", "abcdttt"},
            {"Coord-09", "01-02", "", "", "", "", "ab"}
        };
        
        for (String[] d : datos) {
            coordenadas.add(new CoordenadasUcranianas(d));
            modeloTabla.addRow(new Object[]{
                d[0], d[1], d[2], d[3], d[4], d[5], d[6], "Pendiente"
            });
        }
    }
    
    private void ejecutarMision() {
        new Thread(() -> {
            consola.setText("");
            consola.append("═══════════════════════════════════════════════════\n");
            consola.append("       INICIANDO MISIÓN ANTDRON2K25\n");
            consola.append("═══════════════════════════════════════════════════\n\n");
            
            for (int i = 0; i < coordenadas.size(); i++) {
                final int fila = i;
                CoordenadasUcranianas coord = coordenadas.get(i);
                
                // Animación de carga
                animarCarga(coord.geoposicion);
                
                // Procesar arsenal
                boolean resultado = dron.procesarArsenal(coord.tipoArsenal);
                String estado = resultado ? "✓ DESTRUIDO" : "○ NO OBJETIVO";
                
                SwingUtilities.invokeLater(() -> {
                    modeloTabla.setValueAt(estado, fila, 7);
                });
                
                consola.append(String.format("GEO: %-10s | Arsenal: %-15s | BBA: %s\n",
                    coord.geoposicion, coord.tipoArsenal, 
                    resultado ? "[EXPLOTAR]" : "[NO EXPLOTAR]"));
                
                if (resultado) {
                    consola.append("    ► Bomba BBA activada exitosamente\n");
                    dron.dispararLaser();
                }
                consola.append("\n");
                
                try { Thread.sleep(500); } catch (Exception e) {}
            }
            
            consola.append("═══════════════════════════════════════════════════\n");
            consola.append("       MISIÓN COMPLETADA\n");
            consola.append("═══════════════════════════════════════════════════\n");
            SwingUtilities.invokeLater(() -> lblEstado.setText("Misión completada"));
        }).start();
    }
    
    private void animarCarga(String geo) {
        char[] frames = {'\\', '|', '/', '-'};
        for (int i = 0; i <= 100; i += 20) {
            final int progreso = i;
            final char frame = frames[(i/20) % 4];
            SwingUtilities.invokeLater(() -> {
                barraProgreso.setValue(progreso);
                barraProgreso.setString(frame + " " + progreso + "% " + geo);
                lblEstado.setText("Procesando " + geo);
            });
            try { Thread.sleep(100); } catch (Exception e) {}
        }
    }
}