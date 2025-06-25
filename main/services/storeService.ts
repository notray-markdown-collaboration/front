import Store from 'electron-store';

/**
 * electron-store를 감싸 앱의 영구 데이터를 관리하는 서비스입니다.
 * 클래스로 만들어 단일 인스턴스(싱글턴)를 유지하여 데이터 일관성을 보장합니다.
 */
class StoreService {
  private store: Store;

  constructor() {
    this.store = new Store();
    console.log('📦 StoreService가 초기화되었습니다. 저장 경로:', this.store.path);
  }

  public get<T>(key: string): T | undefined {
    return this.store.get(key) as T | undefined;
  }

  public set(key: string, value: unknown): void {
    this.store.set(key, value);
  }

  public delete(key: string): void {
    this.store.delete(key);
  }
}

// 클래스의 인스턴스를 생성하여 export함으로써 싱글턴 패턴을 구현합니다.
export const storeService = new StoreService();
