//
//  ContentView.swift
//  hybrid
//
//  Created by 七喜🥤 on 2025/5/9.
//

import SwiftUI
import WebKit
import Network

// 添加必要的配置
class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        // 配置 WebView
        let configuration = WKWebViewConfiguration()
        configuration.preferences.setValue(true, forKey: "developerExtrasEnabled")
        return true
    }
}

class WebViewModel: NSObject, ObservableObject {
    @Published var isLoading: Bool = false
    var webView: WKWebView?
    private var networkMonitor: NWPathMonitor?
    private var currentNetworkType: String = "unknown"
    
    override init() {
        super.init()
        setupNetworkMonitor()
        setupWebView()
    }
    
    private func setupNetworkMonitor() {
        networkMonitor = NWPathMonitor()
        networkMonitor?.pathUpdateHandler = { [weak self] path in
            DispatchQueue.main.async {
                if path.usesInterfaceType(.wifi) {
                    self?.currentNetworkType = "wifi"
                } else if path.usesInterfaceType(.cellular) {
                    self?.currentNetworkType = "cellular"
                } else if path.usesInterfaceType(.wiredEthernet) {
                    self?.currentNetworkType = "ethernet"
                } else {
                    self?.currentNetworkType = "none"
                }
                
                // 直接发送消息
                self?.sendNetworkStatus()
            }
        }
        networkMonitor?.start(queue: DispatchQueue.global())
    }
    
    func sendNetworkStatus() {
        let javascript = """
            if (window.webApp && typeof window.webApp.dispatch === 'function') {
                window.webApp.dispatch('base/networkChange', {
                    type: '\(currentNetworkType)',
                    isConnected: \(currentNetworkType != "none")
                });
            }
        """
        
        webView?.evaluateJavaScript(javascript) { (result, error) in
            if let error = error {
                print("发送网络状态更新失败: \(error)")
            } else {
                print("网络状态已更新: \(self.currentNetworkType)")
            }
        }
    }
    
    private func setupWebView() {
        let configuration = WKWebViewConfiguration()
        let userContentController = WKUserContentController()
        
        // 添加消息处理器
        userContentController.add(self, name: "nativeApp")
        print("添加消息处理器: nativeApp")
        
        // 注入 JavaScript 代码 - 在文档开始加载时注入
        let bridgeScript = WKUserScript(
            source: """
                (function() {
                    console.log('注入 nativeBridge');
                    window.nativeBridge = {
                        postMessage: function(message) {
                            console.log('准备发送消息到 Swift:', message);
                            try {
                                window.webkit.messageHandlers.nativeApp.postMessage(message);
                                console.log('消息发送成功');
                            } catch (error) {
                                console.error('发送消息失败:', error);
                            }
                        }
                    };
                    
                    // 添加初始化完成标志
                    window.nativeBridgeInitialized = true;
                    console.log('nativeBridge 创建完成');
                    
                    // 触发初始化完成事件
                    const event = new CustomEvent('nativeBridgeReady');
                    document.dispatchEvent(event);
                })();
            """,
            injectionTime: .atDocumentStart,
            forMainFrameOnly: false
        )
        userContentController.addUserScript(bridgeScript)
        
        // 注入初始化检查代码
        let initCheckScript = WKUserScript(
            source: """
                (function() {
                    console.log('注入初始化检查代码');
                    if (window.nativeBridgeInitialized) {
                        console.log('nativeBridge 已初始化');
                        const event = new CustomEvent('nativeBridgeReady');
                        document.dispatchEvent(event);
                    } else {
                        console.log('等待 nativeBridge 初始化');
                        document.addEventListener('nativeBridgeReady', function() {
                            console.log('收到 nativeBridge 初始化完成事件');
                            if (window.webApp && typeof window.webApp.callBack === 'function') {
                                console.log('找到 callBack 函数');
                                window.webApp.callBack({
                                    id: 'init',
                                    payload: { status: 'ready' }
                                });
                                console.log('初始化回调完成');
                            }
                        });
                    }
                })();
            """,
            injectionTime: .atDocumentEnd,
            forMainFrameOnly: false
        )
        userContentController.addUserScript(initCheckScript)
        
        configuration.userContentController = userContentController
        
        // 启用调试
        configuration.preferences.setValue(true, forKey: "developerExtrasEnabled")
        
        // 设置进程池
        let processPool = WKProcessPool()
        configuration.processPool = processPool
        
        // 设置网站数据存储
        let websiteDataStore = WKWebsiteDataStore.default()
        configuration.websiteDataStore = websiteDataStore
        
        // 创建 WebView
        webView = WKWebView(frame: .zero, configuration: configuration)
        
        // 启用调试
        if #available(iOS 16.4, *) {
            webView?.isInspectable = true
        }
        
        // 加载页面
        loadInitialPage()
    }
    
    private func loadInitialPage() {
        guard let webView = webView else { return }
        
        if let url = URL(string: "http://localhost:8080/") {
            let request = URLRequest(url: url)
            webView.load(request)
            print("开始加载页面: \(url)")
        } else {
            print("无效的 URL")
        }
    }
    
    func reload() {
        print("开始刷新页面")
        webView?.reload()
    }
    
    deinit {
        networkMonitor?.cancel()
    }
}

// 添加 WKScriptMessageHandler 协议支持
extension WebViewModel: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        print("收到消息: name=\(message.name), body=\(message.body)")
        
        if message.name == "nativeApp" {
            if let messageBody = message.body as? String {
                print("收到来自 JavaScript 的消息: \(messageBody)")
                // 回复消息
                DispatchQueue.main.async {
                    let javascript = """
                        if (window.webApp && typeof window.webApp.callBack === 'function') {
                            console.log('准备执行回调，消息ID: \(messageBody)');
                            window.webApp.callBack({
                                id: '\(messageBody)',
                                payload: {
                                    status: 'success',
                                    timestamp: Date.now()
                                }
                            });
                            console.log('回调执行完成');
                        } else {
                            console.error('未找到 callBack 函数，请确保 webApp.callBack 已定义');
                        }
                    """
                    self.webView?.evaluateJavaScript(javascript) { (result, error) in
                        if let error = error {
                            print("执行回调失败: \(error)")
                        } else {
                            print("回调执行成功")
                        }
                    }
                }
            } else if let messageBody = message.body as? [String: Any] {
                print("收到来自 JavaScript 的消息: \(messageBody)")
                // 处理对象类型的消息
                if let id = messageBody["id"] as? String {
                    DispatchQueue.main.async {
                        let javascript = """
                            if (window.webApp && typeof window.webApp.callBack === 'function') {
                                console.log('准备执行回调，消息ID: \(id)');
                                window.webApp.callBack({
                                    id: '\(id)',
                                    payload: {
                                        status: 'success',
                                        timestamp: Date.now()
                                    }
                                });
                                console.log('回调执行完成');
                            } else {
                                console.error('未找到 callBack 函数，请确保 webApp.callBack 已定义');
                            }
                        """
                        self.webView?.evaluateJavaScript(javascript) { (result, error) in
                            if let error = error {
                                print("执行回调失败: \(error)")
                            } else {
                                print("回调执行成功")
                            }
                        }
                    }
                }
            } else {
                print("消息体类型: \(type(of: message.body))")
            }
        } else {
            print("未知的消息处理器: \(message.name)")
        }
    }
}

struct WebView: UIViewRepresentable {
    @ObservedObject var viewModel: WebViewModel
    
    func makeUIView(context: Context) -> WKWebView {
        guard let webView = viewModel.webView else {
            let configuration = WKWebViewConfiguration()
            let userContentController = WKUserContentController()
            userContentController.add(viewModel, name: "nativeApp")
            configuration.userContentController = userContentController
            
            let webView = WKWebView(frame: .zero, configuration: configuration)
            webView.navigationDelegate = context.coordinator
            return webView
        }
        
        webView.navigationDelegate = context.coordinator
        return webView
    }
    
    func updateUIView(_ webView: WKWebView, context: Context) {
        // 保持空实现
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, WKNavigationDelegate {
        var parent: WebView
        
        init(_ parent: WebView) {
            self.parent = parent
            super.init()
            print("Coordinator 初始化完成")
        }
        
        func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
            print("开始加载页面")
            DispatchQueue.main.async {
                self.parent.viewModel.isLoading = true
            }
        }
        
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            print("页面加载完成")
            DispatchQueue.main.async {
                self.parent.viewModel.isLoading = false
                // 延迟 1 秒后发送消息
                DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                    // 发送网络状态
                    self.parent.viewModel.sendNetworkStatus()
                }
            }
        }
        
        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            print("页面加载失败: \(error)")
            DispatchQueue.main.async {
                self.parent.viewModel.isLoading = false
            }
        }
        
        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            print("页面加载失败（临时）: \(error)")
            DispatchQueue.main.async {
                self.parent.viewModel.isLoading = false
            }
        }
    }
}

struct ContentView: View {
    @StateObject private var viewModel = WebViewModel()
    
    var body: some View {
        ZStack {
            WebView(viewModel: viewModel)
            
            VStack {
                Spacer()
                HStack {
                    Spacer()
                    Button(action: {
                        guard !viewModel.isLoading else { return }
                        viewModel.reload()
                    }) {
                        Image(systemName: "arrow.clockwise")
                            .font(.system(size: 24))
                            .foregroundColor(.white)
                            .padding(16)
                            .background(Color.blue.opacity(0.8))
                            .clipShape(Circle())
                            .shadow(radius: 4)
                            .rotationEffect(.degrees(viewModel.isLoading ? 360 : 0))
                            .animation(viewModel.isLoading ? Animation.linear(duration: 1).repeatForever(autoreverses: false) : .default, value: viewModel.isLoading)
                    }
                    .disabled(viewModel.isLoading)
                    .padding(.trailing, 20)
                    .padding(.bottom, 20)
                }
            }
        }
        .edgesIgnoringSafeArea(.all)
    }
}

#Preview {
    ContentView()
}
