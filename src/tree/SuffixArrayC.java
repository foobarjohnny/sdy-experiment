package tree;

/**
 * http://www.cnblogs.com/staginner/archive/2012/02/02/2335600.html
 * http://tieba.baidu.com/f?kz=754580296
 * http://blog.csdn.net/lwl_ls/article/details/1903166
 * http://hi.baidu.com/fhnstephen/blog/item/4b20757c37245d0429388a76.html
 * 
 * @author dysong ������
 */
public class SuffixArrayC

{
	static int		maxn	= 1000001;
	static int[]	wa		= new int[maxn];
	static int[]	wb		= new int[maxn];

	static int[]	wv		= new int[maxn];
	static int[]	ws		= new int[maxn];
	static int[]	rank	= new int[maxn];
	static int[]	height	= new int[maxn];
	static int[]	RMQ		= new int[maxn];
	static int[]	mm		= new int[maxn];
	static int[][]	best	= new int[20][maxn];

	public static boolean cmp(int[] r, int a, int b, int l)
	{
		return r[a] == r[b] && r[a + l] == r[b + l];
	}

	// ����������˵������ĩβ����0���������r[a]==r[b]��ʵ����y[a]==y[b]����˵�����ϲ���������Ϊj���ַ�����ǰ���Ǹ�һ��������ĩβ0����������������ʼλ��������0��λ�ã������ٿ����ˣ���������������Խ�硣
	// da�����Ĳ���n�����ַ������ַ��ĸ����������n�����ǰ�����Ϊ���ַ���ĩβ���ӵ��Ǹ�0�ģ������ĵ�ͼʾ�ϲ�û�л����ַ���ĩβ��0��
	// da�����Ĳ���m�����ַ������ַ���ȡֵ��Χ���ǻ��������һ�����������ԭ���ж�����ĸ����ֱ��ȡ128�����ԭ���б������������Ļ�����m����ȡ������������1��ֵ��
	public static void da(int[] r, int[] sa, int n, int m)
	{
		int i, j, p;
		int[] x = wa, y = wb, t;
		// �������д����ǰѸ����ַ���Ҳ������Ϊ1���ַ��������л����������������Ϊʲô�������Դﵽ���������Ч���������Լ�ʵ����ֽ��ģ��һ�£������Ҳ������������ġ�
		for (i = 0; i < m; i++) {
			ws[i] = 0;
		}
		// x[]���汾���Ǳ��������׺��rankֵ�ģ��������ﲢû��ȥ�洢rankֵ����Ϊ����ֻ���漰x[]�ıȽϹ����������һ�����Բ��ô洢��ʵ��rankֵ���ܹ���ӳ��ԵĴ�С���ɡ�
		for (i = 0; i < n; i++) {
			ws[x[i] = r[i]]++;
		}
		for (i = 1; i < m; i++) {
			ws[i] += ws[i - 1];
		}
		// i֮���Դ�n-1��ʼѭ������Ϊ�˱�֤�ڵ��ַ���������ȵ��ַ���ʱ��Ĭ�Ͽ�ǰ���ַ�����СһЩ��
		// �������ѭ����p����rankֵ���õ��ַ��������������p�ﵽn����ô�����ַ����Ĵ�С��ϵ���Ѿ������ˡ�
		// j������ǰ���ϲ����ַ����ĳ��ȣ�ÿ�ν���������Ϊj���ַ����ϲ���һ������Ϊ2*j���ַ�������Ȼ��������ַ���ĩβ��������ֵӦ�������ۣ���˼����һ���ġ�
		// mͬ���������������Ԫ�ص�ȡֵ��Χ
		for (i = n - 1; i >= 0; i--) {
			sa[--ws[x[i]]] = i;
		}
		for (j = 1, p = 1; p < n; j *= 2, m = p) {
			// �������д���ʵ���˶Եڶ��ؼ��ֵ�����
			// �]�ڶ��ؼ��� �൱������С�����Ծ�ֱ�ӷ���ǰ��
			// ���� a��ab a�Ƿ���ǰ���
			// ������ĵĲ�ͼ�����ǿ��Կ���λ���ڵ�n-j��n��Ԫ�صĵڶ��ؼ��ֶ�Ϊ0�����������ڶ��ؼ������򣬱�Ȼ��ЩԪ�ض�������ǰ��ġ�
			for (p = 0, i = n - j; i < n; i++) {
				y[p++] = i;
			}
			for (i = 0; i < n; i++) {
				// ������ĵĲ�ͼ�����ǿ��Կ���������һ�еĵڶ��ؼ��ֲ�Ϊ0�Ĳ��ֶ��Ǹ�������һ�е��������õ��ģ�����һ����ֻ��sa[i]>=j�ĵ�sa[i]���ַ���
				// �������Լ�����ָ�ġ���?���ַ��������ǰ��ֵ����������ģ��ǰ������ַ����ַ����е�λ�����ģ���rank�Ż���Ϊ��һ�еĵ�sa[i]-j���ַ����ĵڶ��ؼ��֣�
				// ������Ȼ��sa[i]��˳��rank[sa[i]]�ǵ����ģ��������˶�ʣ���Ԫ�صĵڶ��ؼ��ֵ�����
				// �ڶ��ؼ��ֻ���������ɺ�y[]���ŵ��ǰ��ڶ��ؼ���������ַ����±�
				if (sa[i] >= j) {
					y[p++] = sa[i] - j;
				}
			}
			// �����൱����ȡ��ÿ���ַ����ĵ�һ�ؼ��֣�ǰ��˵����x[]�Ǳ���rankֵ�ģ�Ҳ�����ַ����ĵ�һ�ؼ��֣����ŵ�wv[]�����Ƿ�������ʹ��
			// �������д����ǰ���һ�ؼ��ֽ��еĻ�������
			for (i = 0; i < n; i++) {
				wv[i] = x[y[i]];
			}
			for (i = 0; i < m; i++) {
				ws[i] = 0;
			}
			// ���������x[]�洢������ĸ��ַ���rank��ֵ�ˣ��ǵ�����ǰ��˵��������sa[]ֵ��ʱ������ַ�����ͬ��Ĭ��ǰ��ĸ�С�ģ�
			// ���������rank��ʱ����뽫��ͬ���ַ�����������ͬ��rank��Ҫ��Ȼp==n֮��Ͳ�����ѭ������
			for (i = 0; i < n; i++) {
				ws[wv[i]]++;
			}
			for (i = 1; i < m; i++) {
				ws[i] += ws[i - 1];
			}
			// i֮���Դ�n-1��ʼѭ��������ͬ�ϣ�ͬʱע��������y[i]����Ϊy[i]����Ŵ����ַ������±�
			// �������о��Ǽ���ϲ�֮���rankֵ�ˣ����ϲ�֮���rankֵӦ�ô���x[]���棬�����Ǽ����ʱ���ֱ����õ���һ���rankֵ��
			// Ҳ��������x[]����ŵĶ���������Ҽ�Ҫ��x[]�����ã���Ҫ��x[]����ţ���ô�죿
			// ��Ȼ���Ȱ�x[]�Ķ����ŵ�����һ���������棬ʡ�����ˡ���������ý���ָ��ķ�ʽ����Чʵ���˽�x[]�Ķ��������ơ�����y[]�С�
			for (i = n - 1; i >= 0; i--) {
				sa[--ws[wv[i]]] = y[i];
			}
			// ���������x[]�洢������ĸ��ַ���rank��ֵ�ˣ��ǵ�����ǰ��˵��������sa[]ֵ��ʱ������ַ�����ͬ��Ĭ��ǰ��ĸ�С�ģ�
			// ���������rank��ʱ����뽫��ͬ���ַ�����������ͬ��rank��Ҫ��Ȼp==n֮��Ͳ�����ѭ������
			for (t = x, x = y, y = t, p = 1, x[sa[0]] = 0, i = 1; i < n; i++) {
				x[sa[i]] = cmp(y, sa[i - 1], sa[i], j) ? p - 1 : p++;
			}
		}
		return;
	}

	// �ܹ����Լ���height[i]��ֵ�Ĺؼ�����h[i](height[rank[i]])�����ʣ���h[i]>=h[i-1]-1������������һ���������ʽ��������
	// ��������֤���Ĳ���һ��ʼ���������������������һ�����ڸ������ˣ������Ȱ�Ҫ֤ʲô�����⣺
	// ���ڵ�i����׺����j=sa[rank[i] -1]
	// Ҳ����˵j��i�İ�����������һ���ַ�������������i��j�������ǰ׺����height[rank[i]]��
	// �������ھ�����֪��height[rank[i]]�����Ƕ��٣�������Ҫ֤���ľ���������height[rank[i-1]]-1��
	// ���������ڿ�ʼ֤�ɡ�
	// �������ǲ������i-1���ַ����������Լ�����ָ�ġ���?���ַ��������ǰ��ֵ����������ģ��ǰ������ַ����ַ����е�λ�����ģ����ֵ�����������ǰ����Ǹ��ַ����ǵ�k���ַ�����
	// ע��k��һ����i-2����Ϊ��k���ַ����ǰ��ֵ�����������i-1ǰ���Ǹ���������ָ��ԭ�ַ�����λ����i-1ǰ����Ǹ���i-2���ַ�����
	// ��ʱ������height[]�Ķ��壬��k���ַ����͵�i-1���ַ����Ĺ���ǰ׺��Ȼ��height[rank[i-1]]������������һ�µ�k+1���ַ����͵�i���ַ����Ĺ�ϵ��
	// ��һ���������k���ַ����͵�i-1���ַ��������ַ���ͬ����ô��k+1���ַ����������ȿ�����i��ǰ�棬Ҳ������i�ĺ��棬��û�й�ϵ��
	// ��Ϊheight[rank[i-1]]����0��ѽ����ô����height[rank[i]]�Ƕ��ٶ�����height[rank[i]]>=height[rank[i-1]]-1��Ҳ����h[i]>=h[i-1]-1��
	// �ڶ����������k���ַ����͵�i-1���ַ��������ַ���ͬ����ô���ڵ�k+1���ַ������ǵ�k���ַ���ȥ�����ַ��õ��ģ���i���ַ���Ҳ�ǵ�i-1���ַ���ȥ�����ַ��õ��ģ�
	// ��ô��Ȼ��k+1���ַ���Ҫ���ڵ�i���ַ���ǰ�棬Ҫô�Ͳ���ì���ˡ�ͬʱ����k���ַ����͵�i-1���ַ����������ǰ׺��height[rank[i-1]]��
	// ��ô��Ȼ��k+1���ַ����͵�i���ַ����������ǰ׺����height[rank[i-1]]-1��
	// ����Ϊֹ���ڶ��������֤����û���꣬���ǿ�������һ�£����ڱȵ�i���ַ������ֵ�����������ǰ����Щ�ַ�����
	// ˭�͵�i���ַ��������ƶ���ߣ�����˵�����ƶ���ָ�����ǰ׺�ĳ��ȣ�����Ȼ���������ڵ�i���ַ������Ǹ��ַ�����ѽ��
	// ��sa[rank[i]-1]��Ҳ����˵sa[rank[i]]��sa[rank[i]-1]�������ǰ׺������height[rank[i-1]]-1����ô����height[rank[i]]>=height[rank[i-1]]-1��Ҳ��h[i]>=h[i-1]-1��
	// ע�⽲�ò���ȷ ��������
	// ֤������Щ֮������Ĵ���Ҳ�ͱȽ����׿����ˡ�
	// h[i]=height[Rank[i]]����height[i]=h[SA[i]], h[i-1]=
	// height[Rank[i-1]]=LCP(Suffix(SA[Rank[i-1]-1]),Suffix(SA[Rank[i-1]]);
	// height[Rank[SA[i]-1]]=h[SA[i]-1]
	// ��height[i]=LCP(i-1,i)==lcp(Suffix(SA[i-1]),Suffix(SA[i])��1<i��n������height[1]=0��
	public static void calheight(int[] r, int[] sa, int n)
	{
		int i, j, k = 0;
		// ����ÿ���ַ������ֵ�������
		for (i = 1; i <= n; i++) {
			rank[sa[i]] = i;
		}
		// �����������height[rank[i]]��ֵ��Ҳ����k������height[rank[i]]��i����0ѭ����n-1����ʵ����height[]�����˳������height[rank[0]]���㵽height[rank[n-1]]��
		// ��һ�εļ�������k�������ж�һ�����k��0�Ļ�����ôk�Ͳ��ö��ˣ������ַ���ʼ����i���ַ����͵�j���ַ���ǰ���ж�������ͬ�ģ����k��Ϊ0��
		// ������ǰ��֤���ģ������ǰ׺�ĳ���������k-1�����Ǵ����ַ�����k-1���ַ���ʼ����𼴿ɡ�
		for (i = 0; i < n; height[rank[i++]] = k) {
			for (k = k > 0 ? k - 1 : 0, j = sa[rank[i] - 1]; r[i + k] == r[j + k]; k++) {
				;
			}
		}
		return;
	}

	public static void initRMQ(int n)
	{
		int i, j, a, b;
		for (mm[0] = -1, i = 1; i <= n; i++) {
			mm[i] = ((i & (i - 1)) == 0) ? mm[i - 1] + 1 : mm[i - 1];
		}
		for (i = 1; i <= n; i++) {
			best[0][i] = i;
		}
		for (i = 1; i <= mm[n]; i++) {
			for (j = 1; j <= n + 1 - (1 << i); j++) {
				a = best[i - 1][j];
				b = best[i - 1][j + (1 << (i - 1))];
				if (RMQ[a] < RMQ[b]) {
					best[i][j] = a;
				}
				else {
					best[i][j] = b;
				}
			}
		}
		return;
	}

	public static int askRMQ(int a, int b)
	{
		int t;
		t = mm[b - a + 1];
		b -= (1 << t) - 1;
		a = best[t][a];
		b = best[t][b];
		return RMQ[a] < RMQ[b] ? a : b;
	}

	public static int lcp(int a, int b)
	{
		int t;
		a = rank[a];
		b = rank[b];
		if (a > b) {
			t = a;
			a = b;
			b = t;
		}
		return (height[askRMQ(a + 1, b)]);
	}

	public static void main(String[] args) throws Exception
	{
		// �����˵��һ�㣬���ǹ���da��calheight�ĵ������⣬ʵ�����ڡ�С�ޡ�д��Դ�������������µ��õģ���������Ҳ�������Ŀ���da��calheight�е�int
		// n����һ�����ͬʱheight�����ֵ����Ч��Χ��height[1]~height[n]����height[1]=0��ԭ�����sa[0]ʵ���Ͼ������ǲ����Ǹ�0������sa[1]��sa[0]�������ǰ׺��Ȼ��0��
		// da(r, sa, n + 1, 128);
		// calheight(r, sa, n);
	}
}