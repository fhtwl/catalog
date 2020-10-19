# catalog
将markdown转化的html代码，转化为data>children的数组
``` javascript
let html = `<h2><a id="111_0"></a>测试标题111</h2>
<h4><a id="1volatile__1"></a>1.volatile 的原理，作用，能代替锁么？</h4>
<p>Volatile<strong>利用内存栅栏机制来保持变量的一致性</strong>。不能代替锁，其只具备数据可见性一致性，不具备原子性。</p>
<h4><a id="2sleep__wait__3"></a>2.sleep 和 wait 的区别。</h4>
<p>Sleep是休眠线程，wait是等待，sleep是thread的静态方法，wait则是object的方法。<br />
Sleep依旧持有锁，并在指定时间自动唤醒。wait则释放锁。</p>
<h4><a id="3Lock__Synchronized__6"></a>3.Lock 与 Synchronized 的区别。</h4>
<p>首先两者都保持了并发场景下的原子性和可见性，区别则是synchronized的释放锁机制是交由其自身控制，且互斥性在某些场景下不符合逻辑，无法进行干预，不可人为中断等。<br />
而lock常用的则有ReentrantLock和readwritelock两者，添加了类似锁投票、定时锁等候和可中断锁等候的一些特性。此外，它还提供了在激烈争用情况下更佳的性能。</p>
<h4><a id="4synchronized__9"></a>4.synchronized 的原理是什么，解释以下名词：重排序，自旋锁，偏向锁，轻量级锁，可重入锁，公平锁，非公平锁，乐观锁，悲观锁。</h4>
<p>Synchronized底层是通过监视器的enter和exit实现</p>
<h4><a id="5_11"></a>5.用过哪些原子类，他们的原理是什么。</h4>
<p>AtomicInteger； AtomicLong； AtomicReference； AtomicBoolean；基于CAS原语实现 ，比较并交换、加载链接/条件存储，最坏的情况下是旋转锁<br />
<img src="http://39.97.171.32:9000/upload/f382a6ea-d326-442e-8b99-a2892209c02a.jpeg" alt="cf181bb2edbe4099805998b94c22b2cf!400x400.jpeg" /></p>
<h4><a id="6newCache__newFixed__coreSizemaxsize__14"></a>6.用过线程池吗，newCache 和 newFixed 有什么区别，他们的原理简单概括下，构造函数的各个参数的含义是什么，比如 coreSize，maxsize 等。</h4>
<p>newSingleThreadExecutor返回以个包含单线程的Executor,将多个任务交给此Exector时，这个线程处理完一个任务后接着处理下一个任务，若该线程出现异常，将会有一个新的线程来替代。<br />
newFixedThreadPool返回一个包含指定数目线程的线程池，如果任务数量多于线程数目，那么没有没有执行的任务必须等待，直到有任务完成为止。<br />
newCachedThreadPool根据用户的任务数创建相应的线程来处理，该线程池不会对线程数目加以限制，完全依赖于JVM能创建线程的数量，可能引起内存不足。<br />
底层是基于ThreadPoolExecutor实现，借助reentrantlock保证并发。<br />
coreSize核心线程数，maxsize最大线程数。</p>
<h4><a id="7_20"></a>7.线程池的关闭方式有几种，各自的区别是什么。</h4>
<p>Shutdown shutdownNow tryTerminate 清空工作队列，终止线程池中各个线程，销毁线程池</p>`

let treeObj = new CatalogTree({
    html:html,title:''
})
console.log(treeObj.tree)
// {
//     children: [{
//         children: (4) [{…}, {…}, {…}, {…}],
//         class: "H2",
//         id: "111_0",
//         text: "测试标题111",
//     }],
//     class: "H1",
//     id: "tree-body",
//     text: ""
// }
```
